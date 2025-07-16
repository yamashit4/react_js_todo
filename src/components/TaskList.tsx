import type React from "react"
import type { Task } from "../App"
import TaskCard from "./TaskCard"
import "../styles/TaskList.css"

interface TaskListProps {
    tasks: Task[]
    onDelete: (id: string) => void
    onEdit: (task: Task) => void
    onToggleComplete: (id: string) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit, onToggleComplete }) => {
    if (tasks.length === 0) {
        return null
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} onToggleComplete={onToggleComplete} />
            ))}
        </div>
    )
}

export default TaskList
