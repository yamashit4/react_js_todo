"use client"

import type React from "react"
import { useState } from "react"
import "../styles/FilterSection.css"

interface FilterSectionProps {
    onSearchChange: (search: string) => void
    onStatusChange: (status: "all" | "todo" | "done") => void
    onDateChange: (date: string) => void
    totalTasks: number
    completedTasks: number
    pendingTasks: number
}

const FilterSection: React.FC<FilterSectionProps> = ({
    onSearchChange,
    onStatusChange,
    onDateChange,
    totalTasks,
    completedTasks,
    pendingTasks,
}) => {
    const [activeStatus, setActiveStatus] = useState<"all" | "todo" | "done">("all")

    const handleStatusChange = (status: "all" | "todo" | "done") => {
        setActiveStatus(status)
        onStatusChange(status)
    }

    return (
        <div className="filter-section">
            <div className="filter-group">
                <label htmlFor="search" className="filter-label">
                    検索
                </label>
                <input
                    type="text"
                    id="search"
                    placeholder="Search tasks..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="filter-group">
                <label className="filter-label">ステータス</label>
                <div className="status-filters">
                    <button
                        className={`status-button ${activeStatus === "all" ? "active" : ""}`}
                        onClick={() => handleStatusChange("all")}
                    >
                        All
                    </button>
                    <button
                        className={`status-button ${activeStatus === "todo" ? "active" : ""}`}
                        onClick={() => handleStatusChange("todo")}
                    >
                        ToDo
                    </button>
                    <button
                        className={`status-button ${activeStatus === "done" ? "active" : ""}`}
                        onClick={() => handleStatusChange("done")}
                    >
                        Done
                    </button>
                </div>
            </div>

            <div className="filter-group">
                <label htmlFor="date-filter" className="filter-label">
                    日付
                </label>
                <input type="date" id="date-filter" onChange={(e) => onDateChange(e.target.value)} className="date-input" />
            </div>

            <div className="stats-container">
                <h3 className="stats-title">達成率</h3>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-label">合計</span>
                        <span className="stat-value">{totalTasks}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">完了</span>
                        <span className="stat-value completed">{completedTasks}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">未完了</span>
                        <span className="stat-value pending">{pendingTasks}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterSection
