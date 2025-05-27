import React from "react";

export default function Button({ children, onClick, type = "button", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition mb-4"
    >
      {children}
    </button>
  );
}