import express from "express";
import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const { filter = "all" } = req.query;
    const now = new Date();
    let startDate;
    switch (filter) {
      case "today": {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      }
      case "week": {
        // 1. Lấy thứ hiện tại (0 là Chủ nhật, 1 là Thứ Hai...)
        const dayOfWeek = now.getDay();

        // 2. Tính xem cần lùi lại bao nhiêu ngày để về đúng Thứ Hai
        // Nếu hôm nay là Chủ nhật (0) -> lùi 6 ngày để về Thứ 2 đầu tuần
        // Nếu là ngày khác -> lùi (dayOfWeek - 1) ngày. Ví dụ: Thứ 3 (2) lùi 1 ngày.
        const distanceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        // 3. Tính ra ngày của Thứ Hai tuần này
        const mondayDate = now.getDate() - distanceToMonday;

        // 4. Khởi tạo startDate (Đã thêm () cho getFullYear và getMonth)
        startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);

        // 5. Reset giờ về 00:00:00 để lấy trọn vẹn từ rạng sáng ngày Thứ Hai
        startDate.setHours(0, 0, 0, 0);
        break;
      }
      case "month": {
        startDate = new Date(now.getFullYear, now.getMonth, 1);
        break;
      }
      case "all":
      default: {
        startDate: null;
      }
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    const result = await Task.aggregate([
      {
        $match: query,
      },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeTasksCount: [
            { $match: { status: "active" } },
            { $count: "count" },
          ],
          completedTasksCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeTasksCount = result[0].activeTasksCount[0]?.count || 0;
    // Dấu ? có ý nghĩa: Nếu có dữ liệu thì đọc tiếp, nếu không có (bị null hoặc undefined) thì dừng lại và trả về undefined chứ không làm sập ứng dụng."
    const completedTasksCount = result[0].completedTasksCount[0]?.count || 0;

    res.status(200).json({
      status: "success",
      data: { tasks, activeTasksCount, completedTasksCount },
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn tại getAllTask", error);
    res.status(500).json({
      status: "fail",
      message: "Lỗi hệ thống",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    const newTask = await Task.create({ title, status });

    res.status(201).json({
      status: "Success",
      message: "Bạn đã thêm công việc thành công!",
      data: newTask,
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn tại createTask", error);
    res.status(500).json({
      status: "fail",
      message: "Lỗi hệ thống",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { returnDocument: "after" },
    );

    if (!updateTask) {
      return res.status(404).json({
        status: "fail",
        message: "Công việc không tồn tại",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Công việc đã được chỉnh sửa thành công!",
      data: updateTask,
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn tại updateTask", error);
    res.status(500).json({
      status: "fail",
      message: "Lỗi hệ thống",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);

    if (!deleteTask) {
      return res.status(404).json({
        status: "fail",
        message: "Công việc không tồn tại",
      });
    }
    res.status(204).json();
  } catch (error) {
    console.error("Lỗi khi truy vấn tại deleteTask", error);
    res.status(500).json({
      status: "fail",
      message: "Lỗi hệ thống",
    });
  }
};
