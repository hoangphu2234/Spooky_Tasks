import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = ({ filteredTasks, filter, handleTaskChanged }) => {
  // Dữ liệu mẫu
  // const filteredTasks = [
  //   {
  //     _id: 1,
  //     title: "Học bài",
  //     status: "active",
  //     completedAt: null,
  //     createdAt: new Date(),
  //   },
  //   {
  //     _id: 2,
  //     title: "Chơi game",
  //     status: "completed",
  //     completedAt: new Date(),
  //     createdAt: new Date(),
  //   },
  //   {
  //     _id: 3,
  //     title: "Đi chơi",
  //     status: "active",
  //     completedAt: null,
  //     createdAt: new Date(),
  //   },
  // ];

  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }

  return (
    <div className="mb-3 sm:space-y-3">
      {filteredTasks.map((data, index) => (
        <TaskCard
          key={data._id ?? index}
          data={data}
          index={index}
          handleTaskChanged={handleTaskChanged}
        />
      ))}
    </div>
  );
};

export default TaskList;
