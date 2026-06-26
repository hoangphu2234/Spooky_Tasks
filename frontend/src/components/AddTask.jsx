import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/task", {
          title: newTaskTitle,
        });
        toast.success(
          `Công việc "${newTaskTitle}" đã được thêm vào thành công.`,
        );
        handleNewTaskAdded();
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm công việc.");
        toast.error("Lỗi xảy ra khi thêm công việc mới!");
      }
      setNewTaskTitle("");
    } else {
      toast.error("Bạn cần nhập nội dung công việc");
    }
  };

  const handleKeyPress = (event) => {
    if (newTaskTitle.trim()) {
      if (event.key === "Enter") {
        addTask();
      }
    }
  };

  return (
    <div>
      <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-4">
          <Input
            type="Text"
            placeholder="Cần phải làm gì?"
            className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20 "
            value={newTaskTitle}
            onChange={(event) => {
              setNewTaskTitle(event.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="gradient"
            className="py-6 text-base h-9 gap-1.5 px-2.5 sm:h-12 sm:gap-1.5 sm:px-4"
            onClick={addTask}
            disabled={!newTaskTitle.trim()}
          >
            <Plus className="size-4 md:size-5" />
            Thêm
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddTask;
