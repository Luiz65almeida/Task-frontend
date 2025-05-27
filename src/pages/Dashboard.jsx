
import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import TaskList from "../components/organisms/TaskList";
import TabBar from "../components/molecules/TabBar";
import ModalConfirmDelete from "../components/molecules/ModalConfirmDelete";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const dispatch = useDispatch();

  const loadTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data.data);
    } catch (err) {
      console.error("Erro ao carregar tarefas", err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      await axios.post("/tasks", { description: newTask });
      setNewTask("");
      loadTasks();
    } catch (err) {
      console.error("Erro ao adicionar tarefa", err);
    }
  };

  const toggleTask = async (task) => {
    try {
      await axios.put(`/tasks/${task.id}`, {
        ...task,
        done: !task.done,
      });
      loadTasks();
    } catch (err) {
      console.error("Erro ao atualizar tarefa", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      loadTasks();
    } catch (err) {
      console.error("Erro ao deletar tarefa", err);
    }
  };

  const filteredTasks = () => {
    if (!Array.isArray(tasks)) return [];
    if (activeTab === "active") return tasks.filter((t) => !t.done);
    if (activeTab === "completed") return tasks.filter((t) => t.done);
    return tasks;
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="dashboard">
      <div className="flex justify-between items-center mb-4">
        <h2>Lista de Tarefas</h2>
        <button
          onClick={() => dispatch(logout())}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Nova tarefa..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <TaskList tasks={filteredTasks()} onToggle={toggleTask} onDelete={setTaskToDelete} />

      <ModalConfirmDelete
        task={taskToDelete}
        onConfirm={(id) => {
          deleteTask(id);
          setTaskToDelete(null);
        }}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
}
