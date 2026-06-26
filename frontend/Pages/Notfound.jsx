import React from "react";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen min-w-full gap-4 mb-4 text-center">
      <img
        src="404_NotFound.png"
        alt="notFound"
        className="max-w-full mb-4 w-120"
      />
      <h1 className="text-xl font-semibold ">
        Bạn đang đi vào vùng cấm địa 🚫 <br /> Ai cho vào đây 😡
      </h1>

      <a
        href="/"
        className="px-8 py-2 mt-4 font-medium text-white transition shadow-md rounded-xl bg-primary hover:bg-primary-dark "
      >
        Quay lại ngay !!!
      </a>
    </div>
  );
};

export default Notfound;
