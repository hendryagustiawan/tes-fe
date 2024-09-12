import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export function ToastComponent() {
  return (
    <div>
      <ToastContainer theme="colored" position="top-right" autoClose={3000} icon={false} closeButton={false} />
    </div>
  );
}
