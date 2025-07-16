"use client"

import type React from "react"
import "../styles/Header.css"

interface HeaderProps {
    onAddClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
    return (
        <header className="header">
            <h1>My Tasks</h1>
            <button className="add-button" onClick={onAddClick}>
                タスク追加
            </button>
        </header>
    )
}

export default Header
