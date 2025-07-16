"use client"

import type React from "react"
import type { Task } from "../App"
import "../styles/TaskCard.css"

interface TaskCardProps {
    task: Task
    onDelete: (id: string) => void
    onEdit: (task: Task) => void
    onToggleComplete: (id: string) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit, onToggleComplete }) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return "No deadline"

        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    return (
        <div className={`task-card ${task.completed ? "completed" : ""}`}>
            <div className="task-header">
                <label className="checkbox-container">
                    <input type="checkbox" checked={task.completed} onChange={() => onToggleComplete(task.id)} />
                    <span className="checkmark"></span>
                </label>
                <h3 className="task-title">{task.title}</h3>
            </div>

            <div className="task-memo">{task.memo}</div>

            <div className="task-separator"></div>

            <div className="task-footer">
                <span className="task-deadline">{formatDate(task.deadline)}</span>
                <div className="task-actions">
                    <button className="icon-button edit-icon" onClick={() => onEdit(task)} aria-label="Edit task">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button className="icon-button delete-icon" onClick={() => onDelete(task.id)} aria-label="Delete task">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
