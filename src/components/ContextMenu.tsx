"use client"

import { useState, useEffect, useRef } from "react"
import { Eye, Pencil, Trash2, Copy, ExternalLink, Mail } from "lucide-react"

interface ContextMenuProps {
    x: number
    y: number
    onClose: () => void
    onView: () => void
    onEdit: () => void
    onDelete: () => void
    onCopy: () => void
    onOpenLink: () => void
    onSendEmail: () => void
}

export function ContextMenu({
    x,
    y,
    onClose,
    onView,
    onEdit,
    onDelete,
    onCopy,
    onOpenLink,
    onSendEmail
}: ContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose()
            }
        }

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscape)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [onClose])

    const menuItems = [
        { icon: Eye, label: "View details", onClick: onView },
        { icon: Pencil, label: "Edit", onClick: onEdit },
        { icon: Copy, label: "Copy row", onClick: onCopy },
        { icon: ExternalLink, label: "Open website", onClick: onOpenLink },
        { icon: Mail, label: "Send email", onClick: onSendEmail },
        { icon: Trash2, label: "Delete", onClick: onDelete, danger: true },
    ]

    return (
        <div
            ref={menuRef}
            className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-[180px]"
            style={{ left: x, top: y }}
        >
            {menuItems.map((item, index) => (
                <button
                    key={index}
                    onClick={() => {
                        item.onClick()
                        onClose()
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${item.danger ? 'text-red-500 hover:text-red-600' : 'text-gray-700 dark:text-gray-300'
                        }`}
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </button>
            ))}
        </div>
    )
}
