import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONN_STR);
    console.log("Kết nối đến CSDL thành công");
  } catch (error) {
    console.error(error);
    process.exit(1); //Thoát chương trình với sự báo lỗi, nếu truyền (0) là thoát chương trình với sự thành công
  }
};
