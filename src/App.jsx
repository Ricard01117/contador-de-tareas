import { useState } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addTask = (e) => {
    e.preventDefault();

    if (taskText.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <main className="app">
      <section className="task-card">
        <div className="header">
          <p className="tag">Proyecto Para tareas</p>
          <h1>Contador de tareas</h1>
          <p className="subtitle">Organiza tus pendientes de forma rápida.</p>
        </div>

        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            placeholder="Escribe una tarea..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />

          <button type="submit">Agregar</button>
        </form>

        <div className="stats">
          <div>
            <span>{totalTasks}</span>
            <p>Total</p>
          </div>

          <div>
            <span>{pendingTasks}</span>
            <p>Pendientes</p>
          </div>

          <div>
            <span>{completedTasks}</span>
            <p>Hechas</p>
          </div>
        </div>

        <ul className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tienes tareas todavía.</p>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="task-item">
                <button
                  className={task.completed ? "check completed-check" : "check"}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Eliminar
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default App;