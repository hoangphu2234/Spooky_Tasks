import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCheck,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2Icon,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";

const TaskCard = ({ data, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(data.title || "");

  const deleteTask = async (taskID, title) => {
    try {
      await api.delete(`/task/${taskID}`);
      toast.success(`Công việc "${title}" đã được xoá thành công.`);
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi xoá công việc.");
      toast.error("Lỗi xảy ra khi xoá công việc!");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.patch(`/task/${data._id}`, {
        title: updateTitle,
      });
      toast.success("Công việc đã được sửa thành công.");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi sửa công việc.");
      toast.error("Lỗi xảy ra khi sửa công việc!");
    }
  };

  const inputRef = useRef(null);

  // 3. Sử dụng useEffect để tự động focus khi isEditting thay đổi
  useEffect(() => {
    if (isEditting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditting]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };

  const toggleTaskStatus = async () => {
    try {
      if (data.status === "active") {
        await api.patch(`/task/${data._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success(`Công việc "${data.title}" đã hoàn thành.`);
      } else {
        await api.patch(`/task/${data._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.warning(
          `Công việc "${data.title}" đã chuyển sang trạng thái Chưa hoàn thành.`,
        );
      }
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi thay đổi trạng thái công việc.");
      toast.error("Lỗi xảy ra khi thay đổi trạng thái công việc!");
    }
  };

  return (
    <>
      <Card
        className={cn(
          "p-4 min-w-0 bg-gradient-background border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-bounce-in group",
          data.status === "completed" && "opacity-50",
        )}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-center gap-4">
          {/* Nút tròn */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "shrink-0 size-8 rounded-full transition-all duration-200",
              data.status === "completed"
                ? "text-success hover:text-success/80"
                : "text-muted-foreground hover:text-primary",
            )}
            onClick={() => {
              toggleTaskStatus();
            }}
          >
            {data.status === "completed" ? (
              <CheckCircle2 className="size-5" />
            ) : (
              <Circle className="size-5" />
            )}
          </Button>

          {/* Hiển thị hoặc chỉnh sửa data */}
          <div className="flex-1">
            {isEditting ? (
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Bạn cần chỉnh sửa gì?"
                  className="h-12 pr-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  ref={inputRef}
                  value={updateTitle}
                  onChange={(event) => {
                    setUpdateTitle(event.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                  onBlur={() => {
                    setIsEditting(false);
                    setUpdateTitle(data.title || "");
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute w-10 h-10 -translate-y-1/2 right-1 top-1/2 text-muted-foreground hover:text-foreground"
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => {
                    updateTask();
                  }}
                >
                  <CheckCheck className="size-4" />
                </Button>
              </div>
            ) : (
              <p
                className={cn(
                  "text-base transition-all duration-200",
                  data.status === "completed"
                    ? "line-through text-success/75"
                    : "text-foreground",
                )}
              >
                {data.title}
              </p>
            )}
            {/* Ngày tạo và hoàn thành */}
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(data.createdAt).toLocaleString("vi-VN", {
                  day: "2-digit", // Luôn hiển thị 2 chữ số (vd: 05, 15)
                  month: "2-digit", // Luôn hiển thị 2 chữ số
                  year: "numeric", // Hiển thị đầy đủ năm (vd: 2026)
                  hour: "2-digit", // Giờ
                  minute: "2-digit", // Phút
                  hour12: false, // Sử dụng định dạng 24 giờ (Thay vì AM/PM)
                })}
              </span>
              {data.completedAt && (
                <>
                  <Calendar className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {" - "}
                    {new Date(data.completedAt).toLocaleString("vi-VN", {
                      day: "2-digit", // Luôn hiển thị 2 chữ số (vd: 05, 15)
                      month: "2-digit", // Luôn hiển thị 2 chữ số
                      year: "numeric", // Hiển thị đầy đủ năm (vd: 2026)
                      hour: "2-digit", // Giờ
                      minute: "2-digit", // Phút
                      hour12: false, // Sử dụng định dạng 24 giờ (Thay vì AM/PM)
                    })}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Nút chỉnh sửa và xoá */}
          <div className="gap-2 ml-auto sm:hidden group-hover:inline-block animate-fade-in">
            <Button
              variant="ghost"
              size="icon"
              className="transition-colors shrink-0 size-8 text-muted-foreground hover:text-info"
              onClick={() => {
                setIsEditting(true);
                setUpdateTitle(data.title || "");
              }}
            >
              <SquarePen className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="transition-colors shrink-0 size-8 text-muted-foreground hover:text-destructive"
              onClick={() => deleteTask(data._id, data.title)}
            >
              <Trash2Icon className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TaskCard;
