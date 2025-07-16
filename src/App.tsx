"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "./components/Header"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import FilterSection from "./components/FilterSection"
import "./styles/App.css"

export interface Task {
  id: string
  title: string
  memo: string
  deadline: string
  completed: boolean
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<"all" | "todo" | "done">("all")
  const [dateFilter, setDateFilter] = useState<string>("")

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
    applyFilters()
  }, [tasks, searchQuery, statusFilter, dateFilter])

  const applyFilters = () => {
    let result = [...tasks]

    // Apply search filter
    if (searchQuery) {
      result = result.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((task) => (statusFilter === "done" ? task.completed : !task.completed))
    }

    // Apply date filter
    if (dateFilter) {
      result = result.filter((task) => task.deadline === dateFilter)
    }

    setFilteredTasks(result)
  }

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...task,
      completed: false,
    }
    setTasks([...tasks, newTask])
    setShowForm(false)
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
    setShowForm(false)
  }

  // Create a wrapper function to handle both add and update cases
  const handleFormSubmit = (taskData: Task | Omit<Task, "id" | "completed">) => {
    if ("id" in taskData) {
      // This is an edit operation with a full Task object
      updateTask(taskData as Task)
    } else {
      // This is an add operation with a partial Task object
      addTask(taskData as Omit<Task, "id" | "completed">)
    }
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  // Calculate stats
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks

  return (
    <div className="app">
      <Header
        onAddClick={() => {
          setEditingTask(null)
          setShowForm(true)
        }}
      />

      <main className="main-layout">
        <div className="filter-section-container">
          <h2 className="section-title">フィルター</h2>
          <FilterSection
            onSearchChange={setSearchQuery}
            onStatusChange={setStatusFilter}
            onDateChange={setDateFilter}
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
          />
        </div>

        <div className="tasks-section">
          <h2 className="section-title">タスク一覧</h2>
          <TaskList
            tasks={filteredTasks.length > 0 ? filteredTasks : tasks}
            onDelete={deleteTask}
            onEdit={handleEdit}
            onToggleComplete={toggleComplete}
          />
          {filteredTasks.length === 0 && tasks.length === 0 && (
            <div className="empty-state">
              <p>タスクが見つかりません</p>
            </div>
          )}
          {filteredTasks.length === 0 && tasks.length > 0 && (
            <div className="empty-state">
              <p>検索条件に合うタスクがありません</p>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <TaskForm onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} initialData={editingTask} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
