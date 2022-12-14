import React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export const ToastError = (text) => {
  toast(
    (t) => (
      <span>
        {text}
        <button
          className="ml-2 border border-white rounded-full w-4 h-5 md:w-7 md:h-7"
          onClick={() => toast.dismiss(t.id)}
        >
          X
        </button>
      </span>
    ),
    {
      duration: 5000,
      style: {
        background: "#c10202",
        color: "white",
      },
    }
  );
};

export const ToastSuccess = (text) => {
  toast(
    (t) => (
      <span>
        {text}
        <button
          className="ml-2 border border-white rounded-full w-4 h-5 md:w-7 md:h-7"
          onClick={() => toast.dismiss(t.id)}
        >
          X
        </button>
      </span>
    ),
    {
      duration: 5000,
      style: {
        background: "#1e1e1e",
        color: "white",
      },
    }
  );
};
