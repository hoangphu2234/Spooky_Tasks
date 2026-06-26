import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const Homepage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  //Gọi là Buffer vì Buffer là chỗ gom data lại rồi mới xử lí tiếp (data thô và cần chờ xử lý).

  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchDatas();
  }, [dateQuery]);

  const handleTaskChanged = () => {
    fetchDatas();
  };

  //Logic
  const fetchDatas = async () => {
    try {
      const res = await api.get(`/task?filter=${dateQuery}`);
      setTaskBuffer(res.data.data.tasks);
      setActiveTasksCount(res.data.data.activeTasksCount);
      setCompletedTasksCount(res.data.data.completedTasksCount);
    } catch (error) {
      console.log("Lỗi xảy ra khi truy xuất tasks: ", error);
      toast.error("Lỗi xảy ra khi truy xuất dữ liệu.");
    }
  };

  //Biến lọc
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";

      case "completed":
        return task.status === "completed";

      default:
        return true;
    }
  });

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit,
  );

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="relative w-full min-h-screen">
      {/* Dashed Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
          WebkitMaskImage: `
        repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        )
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      {/* Your Content/Components */}

      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-4xl py-3 mx-auto space-y-6">
          {/* === Đầu trang === */}
          <Header />

          {/* === Tạo nhiệm vụ === */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* === Thống kê và bộ lọc === */}
          <StatsAndFilters
            completedTasksCount={completedTasksCount}
            activeTasksCount={activeTasksCount}
            filter={filter}
            setFilter={setFilter}
          />

          {/* === Danh sách công việc === */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          {/* === Phân trang danh sách công việc và lọc theo Ngày === */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* === Chân trang === */}
          <Footer
            completedTasksCount={completedTasksCount}
            activeTasksCount={activeTasksCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
