import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 9 }) => {
  return (
    <>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {completedTasksCount > 0 && activeTasksCount > 0 && (
            <>
              👏 Yasss, bạn đã hoàn thành được {completedTasksCount} công việc
              rồi. <br className="block sm:hidden" />
              {activeTasksCount > 0 &&
                ` Chỉ còn lại ${activeTasksCount} công việc nữa thôi!!!`}
            </>
          )}
          {completedTasksCount === 0 &&
            activeTasksCount > 0 &&
            `Bắt đầu làm ${activeTasksCount} công việc đi bạn eyyy 😱😱😱`}

          {completedTasksCount > 0 &&
            activeTasksCount === 0 &&
            `🥳🥳🥳Chúc mừng. Bạn đã làm hết ${completedTasksCount} công việc rồi!!!`}
        </p>
      </div>
    </>
  );
};

export default Footer;
