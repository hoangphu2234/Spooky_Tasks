import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center bg-gradient-background shadow-custom-md">
      <div className="space-y-4">
        <Circle className="mx-auto text-muted-foreground size-12" />
        <div>
          <h1 className="text-base font-medium sm:text-lg text-foreground">
            {filter === "active"
              ? "Chưa có công việc nào đang làm"
              : filter === "completed"
                ? "Chưa có công việc nào hoàn thành"
                : "Chưa có công việc nào!!!"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {filter === "all"
              ? "Hãy thêm công việc đầu tiên để bắt đầu."
              : `Hãy chuyển sang 'Tất cả' để thấy toàn bộ công việc.`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
