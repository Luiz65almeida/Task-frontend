import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import "../styles/App.css";

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

  const handleAddTask = async () => {
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

      <input
        type="text"
        placeholder="Nova tarefa..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Adicionar</button>

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

      <ul>
        {filteredTasks().map((task) => (
          <li key={task.id} className="task-item">
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task)}
              />
              {task.done ? <s>{task.description}</s> : task.description}
            </label>
            <button
              onClick={() => setTaskToDelete(task)}
              className="delete-btn"
              title="Excluir"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>

      {taskToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              Tem certeza que deseja excluir:{" "}
              <strong>{taskToDelete.description}</strong>?
            </p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  deleteTask(taskToDelete.id);
                  setTaskToDelete(null);
                }}
                className="confirm"
              >
                Confirmar
              </button>
              <button onClick={() => setTaskToDelete(null)} className="cancel">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
