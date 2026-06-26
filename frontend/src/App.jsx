import React from "react";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "../Pages/Homepage";
import Notfound from "../Pages/Notfound";

function App() {
  return (
    <>
      <Toaster richColors />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
