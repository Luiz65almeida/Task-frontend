import React from "react";

export default function TabBar({ activeTab, setActiveTab }) {
  return (
    <div className="tab-buttons">
      <button
        className={activeTab === "all" ? "active" : ""}
        onClick={() => setActiveTab("all")}
      >
        Todas
      </button>
      <button
        className={activeTab === "active" ? "active" : ""}
        onClick={() => setActiveTab("active")}
      >
        Ativas
      </button>
      <button
        className={activeTab === "completed" ? "active" : ""}
        onClick={() => setActiveTab("completed")}
      >
        Concluídas
      </button>
    </div>
  );
}