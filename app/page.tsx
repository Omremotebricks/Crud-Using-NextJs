"use client";

import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../lib/tasks";

interface Task {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

/* ---------- Theme Hook ---------- */
const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDark(saved === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return { isDark, toggleTheme };
};

/* ---------- Loaders ---------- */

const PageLoader = ({ isDark }: { isDark: boolean }) => (
  <div
    className={`min-h-screen flex items-center justify-center ${
      isDark ? "bg-gray-900" : "bg-gray-100"
    }`}
  >
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p
        className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}
      >
        Loading tasks...
      </p>
    </div>
  </div>
);

const ButtonLoader = () => (
  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

/* ---------- Main Component ---------- */

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🗑️</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Task</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold">"{taskTitle}"</span>? This action
            cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { isDark, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    task: Task | null;
  }>({ isOpen: false, task: null });
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data || []);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);

    try {
      if (editingTask) {
        await updateTask(editingTask.id, title, description);
        setEditingTask(null);
      } else {
        await createTask(title, description);
      }

      setTitle("");
      setDescription("");
      await loadTasks();
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (task: Task) => {
    setDeleteModal({ isOpen: true, task });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.task) return;
    await deleteTask(deleteModal.task.id);
    setDeleteModal({ isOpen: false, task: null });
    loadTasks();
  };

  if (pageLoading) return <PageLoader isDark={isDark} />;

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div
          className={`p-6 rounded-xl shadow transition-colors duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Task Manager
              </h1>
              <p
                className={`transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Simple CRUD with Supabase
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                isDark
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span className="text-lg select-none">
                {isDark ? "☀️" : "🌙"}
              </span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`p-6 rounded-xl shadow space-y-4 transition-colors duration-300 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`font-semibold text-lg transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {editingTask ? "Edit Task" : "Create Task"}
          </h2>

          <input
            className={`w-full border rounded-lg px-4 py-3 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            style={{ userSelect: "auto", outline: "none" }}
            required
          />

          <textarea
            className={`w-full  border rounded-lg px-4 py-3 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            style={{ userSelect: "auto", outline: "none", color: "#101828" }}
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-70 hover:bg-blue-700 transition-all duration-200"
            >
              {loading ? <ButtonLoader /> : editingTask ? "Update" : "Add"}
            </button>

            {editingTask && (
              <button
                type="button"
                onClick={() => {
                  setEditingTask(null);
                  setTitle("");
                  setDescription("");
                }}
                className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                  isDark
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p
              className={`text-center ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No tasks yet. Add one 👆
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`p-5 rounded-xl shadow flex justify-between ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div>
                  <h3
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditingTask(task);
                      setTitle(task.title);
                      setDescription(task.description || "");
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(task)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, task: null })}
        onConfirm={handleDeleteConfirm}
        taskTitle={deleteModal.task?.title || ""}
      />
    </div>
  );
}
