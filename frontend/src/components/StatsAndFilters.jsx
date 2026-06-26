import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Filter } from "lucide-react";
import { Button } from "./ui/button";

const StatsAndFilters = ({
  completedTasksCount,
  activeTasksCount,
  filter = "all",
  setFilter,
}) => {
  return (
    <div className="flex items-center justify-around w-full sm:justify-between">
      <div className="flex flex-col gap-4 sm:gap-2 sm:flex-row">
        <Badge
          variant="secondary"
          className="py-2 sm:px-4 sm:py-4 bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="py-2 sm:px-4 sm:py-4 bg-white/50 text-success border-success/20"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            className="capitalize rounded-md"
            size="sm"
            onClick={() => {
              setFilter(type);
            }}
          >
            <Filter className="size-4" />
            {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
