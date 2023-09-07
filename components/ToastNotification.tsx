import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// take props from component show message and type of message when we call this component

interface ToastNotificationProps {
  message: string;
  type: string;
}

export default function ToastNotification({
  message,
  type,
}: ToastNotificationProps) {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else if (type === "info") {
    toast.info(message);
  } else if (type === "warning") {
    toast.warning(message);
  }
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={200}
        hideProgressBar={false}
      />
    </div>
  );
}
