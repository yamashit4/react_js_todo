"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Task } from "../App"
import "../styles/TaskForm.css"

interface TaskFormProps {
    onSubmit: (task: Task | Omit<Task, "id" | "completed">) => void
    onCancel: () => void
    initialData: Task | null
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [title, setTitle] = useState("")
    const [memo, setMemo] = useState("")
    const [deadline, setDeadline] = useState("")

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title)
            setMemo(initialData.memo)
            setDeadline(initialData.deadline)
        }
    }, [initialData])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return

        if (initialData) {
            onSubmit({
                ...initialData,
                title,
                memo,
                deadline,
            })
        } else {
            onSubmit({
                title,
                memo,
                deadline,
            })
        }
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>{initialData ? "Edit Task" : "Add New Task"}</h2>

            <div className="form-group">
                <label htmlFor="title">タイトル</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="memo">メモ</label>
                <textarea
                    id="memo"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="Add details about your task"
                    rows={3}
                />
            </div>

            <div className="form-group">
                <label htmlFor="deadline">期限</label>
                <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>

            <div className="form-actions">
                <button type="button" className="cancel-button" onClick={onCancel}>
                    キャンセル
                </button>
                <button type="submit" className="submit-button">
                    {initialData ? "Update" : "Add"} タスク
                </button>
            </div>
        </form>
    )
}

export default TaskForm
