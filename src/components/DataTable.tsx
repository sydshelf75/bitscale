"use client"

import React, { useState, useMemo, useCallback, useRef } from "react"
import {
    ChevronRight,
    Link as LinkIcon,
    User,
    CheckCircle2,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronsLeft,
    ChevronsRight,
    Search,
    X,
    ChevronDown,
    ChevronUp,
    GripVertical
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { ContextMenu } from "@/components/ContextMenu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Types
interface DataRow {
    id: number
    name: string
    date: string
    company: string
    companyLogo: string
    companyColor: string
    website: string
    linkedin: string
    emailStatus: string
    selected?: boolean
}

type SortDirection = "asc" | "desc" | null
type SortField = keyof DataRow | null
type GroupBy = "none" | "company" | "emailStatus"

// Sample data matching the design
const initialData: DataRow[] = [
    { id: 1, name: "Mike Braham", date: "Oct 12, 2024 at 14:08 PM", company: "Google", companyLogo: "G", companyColor: "text-blue-500", website: "https://www.example.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 2, name: "Alex Johnson", date: "Oct 12, 2024 at 14:08 PM", company: "Amazon", companyLogo: "a", companyColor: "text-gray-800", website: "https://www.sample.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 3, name: "Sarah Thompson", date: "Oct 12, 2024 at 14:08 PM", company: "LinkedIn", companyLogo: "in", companyColor: "text-blue-600", website: "https://www.testsite.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 4, name: "David Lee", date: "Oct 12, 2024 at 14:08 PM", company: "Microsoft", companyLogo: "M", companyColor: "text-orange-500", website: "https://www.demo.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 5, name: "Emily Carter", date: "Oct 12, 2024 at 14:08 PM", company: "TED", companyLogo: "TED", companyColor: "text-red-600", website: "https://www.example.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 6, name: "James Smith", date: "Oct 12, 2024 at 14:08 PM", company: "Unilever", companyLogo: "U", companyColor: "text-blue-700", website: "https://www.webpage.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 7, name: "Laura White", date: "Oct 12, 2024 at 14:08 PM", company: "Apple", companyLogo: "", companyColor: "text-gray-800", website: "https://www.mywebsite.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 8, name: "Chris Brown", date: "Oct 12, 2024 at 14:08 PM", company: "Google", companyLogo: "G", companyColor: "text-blue-500", website: "https://www.newsite.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 9, name: "Jessica Green", date: "Oct 12, 2024 at 14:08 PM", company: "Unilever", companyLogo: "U", companyColor: "text-blue-700", website: "https://www.uniqueurl.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 10, name: "Daniel Harris", date: "Oct 12, 2024 at 14:08 PM", company: "Microsoft", companyLogo: "M", companyColor: "text-orange-500", website: "https://www.originalsite.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 11, name: "Megan Clark", date: "Oct 12, 2024 at 14:08 PM", company: "Apple", companyLogo: "", companyColor: "text-gray-800", website: "https://www.freshpage.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 12, name: "Brian Lewis", date: "Oct 12, 2024 at 14:08 PM", company: "TED", companyLogo: "TED", companyColor: "text-red-600", website: "https://www.differentdomain.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 13, name: "Samantha Hall", date: "Oct 12, 2024 at 14:08 PM", company: "Google", companyLogo: "G", companyColor: "text-blue-500", website: "https://www.alternativesite.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 14, name: "Robert Wilson", date: "Oct 12, 2024 at 14:08 PM", company: "Amazon", companyLogo: "a", companyColor: "text-gray-800", website: "https://www.testurl.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 15, name: "Jennifer Moore", date: "Oct 12, 2024 at 14:08 PM", company: "LinkedIn", companyLogo: "in", companyColor: "text-blue-600", website: "https://www.samplesite.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 16, name: "Michael Taylor", date: "Oct 12, 2024 at 14:08 PM", company: "Microsoft", companyLogo: "M", companyColor: "text-orange-500", website: "https://www.newdomain.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 17, name: "Ashley Anderson", date: "Oct 12, 2024 at 14:08 PM", company: "Apple", companyLogo: "", companyColor: "text-gray-800", website: "https://www.uniquepage.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 18, name: "Kevin Thomas", date: "Oct 12, 2024 at 14:08 PM", company: "Google", companyLogo: "G", companyColor: "text-blue-500", website: "https://www.anothersite.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 19, name: "Amanda Jackson", date: "Oct 12, 2024 at 14:08 PM", company: "TED", companyLogo: "TED", companyColor: "text-red-600", website: "https://www.randomurl.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 20, name: "Joshua White", date: "Oct 12, 2024 at 14:08 PM", company: "Unilever", companyLogo: "U", companyColor: "text-blue-700", website: "https://www.finalsite.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
]

// Column widths state
interface ColumnWidths {
    checkbox: number
    id: number
    name: number
    date: number
    company: number
    website: number
    linkedin: number
    emailStatus: number
}

const defaultColumnWidths: ColumnWidths = {
    checkbox: 40,
    id: 50,
    name: 200,
    date: 180,
    company: 150,
    website: 180,
    linkedin: 180,
    emailStatus: 160,
}

// Company Logo Component
function CompanyLogo({ company }: { company: string }) {
    if (company === "Apple") {
        return <span className="text-gray-800 dark:text-gray-200"></span>
    }
    if (company === "TED") {
        return (
            <span className="inline-flex items-center justify-center bg-red-600 text-white text-xs font-bold px-1 rounded">
                TED
            </span>
        )
    }
    if (company === "LinkedIn") {
        return (
            <span className="inline-flex items-center justify-center bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded">
                in
            </span>
        )
    }
    if (company === "Microsoft") {
        return (
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-red-500" />
                <div className="bg-green-500" />
                <div className="bg-blue-500" />
                <div className="bg-yellow-500" />
            </div>
        )
    }
    if (company === "Google") {
        return <span className="text-blue-500 font-bold">G</span>
    }
    if (company === "Amazon") {
        return <span className="text-gray-800 dark:text-gray-200 font-bold">a</span>
    }
    if (company === "Unilever") {
        return <span className="text-blue-700 font-bold">U</span>
    }
    return null
}

// Email Status Badge
function EmailStatusBadge({ status }: { status: string }) {
    if (status === "found") {
        return (
            <div className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm">Email Found</span>
            </div>
        )
    }
    if (status === "not_met") {
        return (
            <div className="flex items-center gap-1 text-red-500">
                <span className="text-sm">Run condition not met</span>
            </div>
        )
    }
    return null
}

// Highlight matching text
function HighlightText({ text, search }: { text: string; search: string }) {
    if (!search.trim()) return <>{text}</>

    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)

    return (
        <>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    )
}

// Sort Icon Component
function SortIcon({ field, sortField, sortDirection }: {
    field: SortField;
    sortField: SortField;
    sortDirection: SortDirection
}) {
    if (sortField !== field) {
        return <ArrowUpDown className="h-4 w-4 text-gray-400" />
    }
    if (sortDirection === "asc") {
        return <ArrowUp className="h-4 w-4 text-blue-600" />
    }
    return <ArrowDown className="h-4 w-4 text-blue-600" />
}

// Column Resize Handle
function ResizeHandle({ onResize }: { onResize: (delta: number) => void }) {
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        const startX = e.clientX

        const handleMouseMove = (e: MouseEvent) => {
            const delta = e.clientX - startX
            onResize(delta)
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    return (
        <div
            className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-blue-500/50 group"
            onMouseDown={handleMouseDown}
        >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
        </div>
    )
}

export function DataTable() {
    // State
    const [data, setData] = useState<DataRow[]>(initialData)
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
    const [searchQuery, setSearchQuery] = useState("")
    const [sortField, setSortField] = useState<SortField>(null)
    const [sortDirection, setSortDirection] = useState<SortDirection>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [hoveredRow, setHoveredRow] = useState<number | null>(null)
    const [editingCell, setEditingCell] = useState<{ id: number; field: keyof DataRow } | null>(null)
    const [editValue, setEditValue] = useState("")
    const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null)
    const [columnWidths, setColumnWidths] = useState<ColumnWidths>(defaultColumnWidths)
    const [groupBy, setGroupBy] = useState<GroupBy>("none")
    const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; rowId: number } | null>(null)

    // Filter and sort data
    const processedData = useMemo(() => {
        let result = [...data]

        // Filter by search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = result.filter(row =>
                row.name.toLowerCase().includes(query) ||
                row.company.toLowerCase().includes(query) ||
                row.website.toLowerCase().includes(query) ||
                row.emailStatus.toLowerCase().includes(query)
            )
        }

        // Sort
        if (sortField && sortDirection) {
            result.sort((a, b) => {
                const aVal = a[sortField]
                const bVal = b[sortField]
                if (typeof aVal === "string" && typeof bVal === "string") {
                    return sortDirection === "asc"
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal)
                }
                if (typeof aVal === "number" && typeof bVal === "number") {
                    return sortDirection === "asc" ? aVal - bVal : bVal - aVal
                }
                return 0
            })
        }

        return result
    }, [data, searchQuery, sortField, sortDirection])

    // Group data
    const groupedData = useMemo(() => {
        if (groupBy === "none") return null

        const groups: Record<string, DataRow[]> = {}
        processedData.forEach(row => {
            const key = groupBy === "company" ? row.company : row.emailStatus
            if (!groups[key]) groups[key] = []
            groups[key].push(row)
        })
        return groups
    }, [processedData, groupBy])

    // Pagination
    const totalPages = Math.ceil(processedData.length / pageSize)
    const paginatedData = useMemo(() => {
        if (groupBy !== "none") return processedData
        const start = (currentPage - 1) * pageSize
        return processedData.slice(start, start + pageSize)
    }, [processedData, currentPage, pageSize, groupBy])

    // Handlers
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            if (sortDirection === "asc") {
                setSortDirection("desc")
            } else if (sortDirection === "desc") {
                setSortField(null)
                setSortDirection(null)
            }
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(new Set(paginatedData.map(row => row.id)))
        } else {
            setSelectedRows(new Set())
        }
    }

    const handleSelectRow = (id: number, checked: boolean, event?: React.MouseEvent) => {
        const newSelected = new Set(selectedRows)
        const currentIndex = paginatedData.findIndex(row => row.id === id)

        // Shift+click for range selection
        if (event?.shiftKey && lastSelectedIndex !== null) {
            const start = Math.min(lastSelectedIndex, currentIndex)
            const end = Math.max(lastSelectedIndex, currentIndex)
            for (let i = start; i <= end; i++) {
                newSelected.add(paginatedData[i].id)
            }
        } else {
            if (checked) {
                newSelected.add(id)
            } else {
                newSelected.delete(id)
            }
        }

        setSelectedRows(newSelected)
        setLastSelectedIndex(currentIndex)
    }

    const handleDelete = (id: number) => {
        setData(data.filter(row => row.id !== id))
        selectedRows.delete(id)
        setSelectedRows(new Set(selectedRows))
    }

    const handleBulkDelete = () => {
        setData(data.filter(row => !selectedRows.has(row.id)))
        setSelectedRows(new Set())
    }

    const handleStartEdit = (id: number, field: keyof DataRow, value: string) => {
        setEditingCell({ id, field })
        setEditValue(value)
    }

    const handleSaveEdit = () => {
        if (editingCell) {
            setData(data.map(row =>
                row.id === editingCell.id
                    ? { ...row, [editingCell.field]: editValue }
                    : row
            ))
            setEditingCell(null)
            setEditValue("")
        }
    }

    const handleCancelEdit = () => {
        setEditingCell(null)
        setEditValue("")
    }

    const handleExportCSV = useCallback(() => {
        const rowsToExport = selectedRows.size > 0
            ? data.filter(row => selectedRows.has(row.id))
            : processedData

        const headers = ["ID", "Name", "Date", "Company", "Website", "LinkedIn", "Email Status"]
        const csvContent = [
            headers.join(","),
            ...rowsToExport.map(row =>
                [row.id, row.name, row.date, row.company, row.website, row.linkedin, row.emailStatus]
                    .map(val => `"${val}"`)
                    .join(",")
            )
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "data-export.csv"
        a.click()
        URL.revokeObjectURL(url)
    }, [data, processedData, selectedRows])

    const handleColumnResize = (column: keyof ColumnWidths, delta: number) => {
        setColumnWidths(prev => ({
            ...prev,
            [column]: Math.max(50, prev[column] + delta)
        }))
    }

    const toggleGroup = (groupKey: string) => {
        const newCollapsed = new Set(collapsedGroups)
        if (newCollapsed.has(groupKey)) {
            newCollapsed.delete(groupKey)
        } else {
            newCollapsed.add(groupKey)
        }
        setCollapsedGroups(newCollapsed)
    }

    const handleContextMenu = (e: React.MouseEvent, rowId: number) => {
        e.preventDefault()
        setContextMenu({ x: e.clientX, y: e.clientY, rowId })
    }

    const handleCopyRow = (id: number) => {
        const row = data.find(r => r.id === id)
        if (row) {
            navigator.clipboard.writeText(JSON.stringify(row, null, 2))
        }
    }

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (editingCell) {
            if (e.key === "Enter") {
                handleSaveEdit()
            } else if (e.key === "Escape") {
                handleCancelEdit()
            }
        }
    }

    const isAllSelected = paginatedData.length > 0 && paginatedData.every(row => selectedRows.has(row.id))

    // Render grouped row
    const renderRow = (row: DataRow) => (
        <TableRow
            key={row.id}
            className={`
        ${selectedRows.has(row.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
        ${hoveredRow === row.id ? 'bg-gray-50 dark:bg-gray-800' : ''}
        transition-colors
      `}
            onMouseEnter={() => setHoveredRow(row.id)}
            onMouseLeave={() => setHoveredRow(null)}
            onContextMenu={(e) => handleContextMenu(e, row.id)}
        >
            <TableCell
                className="border-r sticky left-0 bg-white dark:bg-gray-900 z-10"
                style={{ width: columnWidths.checkbox }}
            >
                <Checkbox
                    checked={selectedRows.has(row.id)}
                    onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                    onClick={(e: React.MouseEvent) => {
                        if (e.shiftKey) {
                            e.preventDefault()
                            handleSelectRow(row.id, true, e)
                        }
                    }}
                />
            </TableCell>
            <TableCell
                className="text-center text-gray-500 border-r"
                style={{ width: columnWidths.id }}
            >
                {row.id}
            </TableCell>
            <TableCell
                className="border-r"
                style={{ width: columnWidths.name }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <User className="h-3 w-3 text-gray-500" />
                        </div>
                        {editingCell?.id === row.id && editingCell?.field === "name" ? (
                            <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={handleSaveEdit}
                                autoFocus
                                className="h-7 w-32"
                            />
                        ) : (
                            <span
                                className="text-blue-600 cursor-pointer"
                                onDoubleClick={() => handleStartEdit(row.id, "name", row.name)}
                            >
                                <HighlightText text={row.name} search={searchQuery} />
                            </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    {/* Hover Actions */}
                    {hoveredRow === row.id && !editingCell && (
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => alert(`View ${row.name}`)}
                            >
                                <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleStartEdit(row.id, "name", row.name)}
                            >
                                <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-red-500 hover:text-red-600"
                                onClick={() => handleDelete(row.id)}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    )}
                </div>
            </TableCell>
            <TableCell
                className="text-gray-600 dark:text-gray-400 border-r"
                style={{ width: columnWidths.date }}
            >
                {row.date}
            </TableCell>
            <TableCell
                className="border-r"
                style={{ width: columnWidths.company }}
            >
                {row.company && (
                    <div className="flex items-center gap-2">
                        <CompanyLogo company={row.company} />
                        <span><HighlightText text={row.company} search={searchQuery} /></span>
                    </div>
                )}
            </TableCell>
            <TableCell
                className="border-r"
                style={{ width: columnWidths.website }}
            >
                {row.website && (
                    <div className="flex items-center gap-1 text-blue-600">
                        <LinkIcon className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">
                            <HighlightText text={row.website} search={searchQuery} />
                        </span>
                    </div>
                )}
            </TableCell>
            <TableCell
                className="border-r"
                style={{ width: columnWidths.linkedin }}
            >
                {row.linkedin && (
                    <div className="flex items-center gap-1 text-blue-600">
                        <LinkIcon className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">{row.linkedin}</span>
                    </div>
                )}
            </TableCell>
            <TableCell style={{ width: columnWidths.emailStatus }}>
                <EmailStatusBadge status={row.emailStatus} />
            </TableCell>
        </TableRow>
    )

    return (
        <div className="flex flex-col flex-1 overflow-hidden" onKeyDown={handleKeyDown}>
            {/* Search, Group, and Bulk Actions Bar */}
            <div className="flex flex-wrap items-center justify-between px-2 sm:px-4 py-2 gap-2 bg-gray-50 dark:bg-gray-900 border-b">
                {/* Search */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 flex-1 min-w-0">
                    <div className="relative w-full xs:w-48 sm:w-56 md:w-64">
                        <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="pl-7 sm:pl-9 pr-7 sm:pr-8 text-sm h-8"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2"
                            >
                                <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>

                    {/* Group By */}
                    <div className="hidden sm:flex items-center gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Group by:</span>
                        <Select
                            value={groupBy}
                            onChange={(e) => setGroupBy(e.target.value as GroupBy)}
                            className="w-24 sm:w-32 text-sm"
                        >
                            <option value="none">None</option>
                            <option value="company">Company</option>
                            <option value="emailStatus">Email Status</option>
                        </Select>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedRows.size > 0 && (
                    <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden xs:inline">
                            {selectedRows.size} selected
                        </span>
                        <Button variant="outline" size="sm" onClick={handleExportCSV} className="h-7 sm:h-8 text-xs sm:text-sm">
                            Export
                        </Button>
                        <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="h-7 sm:h-8 text-xs sm:text-sm">
                            Delete
                        </Button>
                    </div>
                )}

                {/* Results count */}
                <div className="text-xs sm:text-sm text-gray-500">
                    {processedData.length} results
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <Table>
                    <TableHeader className="bg-[#F0F6F0] dark:bg-gray-800 sticky top-0 z-10">
                        <TableRow className="border-b">
                            <TableHead
                                className="border-r sticky left-0 bg-[#F0F6F0] dark:bg-gray-800 z-20 relative"
                                style={{ width: columnWidths.checkbox }}
                            >
                                <Checkbox
                                    checked={isAllSelected}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                            </TableHead>
                            <TableHead
                                className="text-center border-r relative"
                                style={{ width: columnWidths.id }}
                            >
                                #
                                <ResizeHandle onResize={(delta) => handleColumnResize('id', delta)} />
                            </TableHead>
                            <TableHead
                                className="border-r cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                                style={{ width: columnWidths.name }}
                                onClick={() => handleSort("name")}
                            >
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Imported Data</span>
                                    <SortIcon field="name" sortField={sortField} sortDirection={sortDirection} />
                                </div>
                                <ResizeHandle onResize={(delta) => handleColumnResize('name', delta)} />
                            </TableHead>
                            <TableHead
                                className="border-r cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                                style={{ width: columnWidths.date }}
                                onClick={() => handleSort("date")}
                            >
                                <div className="flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4" />
                                    <span>Last Updated At</span>
                                    <SortIcon field="date" sortField={sortField} sortDirection={sortDirection} />
                                </div>
                                <ResizeHandle onResize={(delta) => handleColumnResize('date', delta)} />
                            </TableHead>
                            <TableHead
                                className="border-r cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                                style={{ width: columnWidths.company }}
                                onClick={() => handleSort("company")}
                            >
                                <div className="flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4" />
                                    <span>Company Name</span>
                                    <SortIcon field="company" sortField={sortField} sortDirection={sortDirection} />
                                </div>
                                <ResizeHandle onResize={(delta) => handleColumnResize('company', delta)} />
                            </TableHead>
                            <TableHead
                                className="border-r relative"
                                style={{ width: columnWidths.website }}
                            >
                                <div className="flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4 text-emerald-500" />
                                    <span>Company Website</span>
                                </div>
                                <ResizeHandle onResize={(delta) => handleColumnResize('website', delta)} />
                            </TableHead>
                            <TableHead
                                className="border-r relative"
                                style={{ width: columnWidths.linkedin }}
                            >
                                <div className="flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4" />
                                    <span>LinkedIn Job URL</span>
                                </div>
                                <ResizeHandle onResize={(delta) => handleColumnResize('linkedin', delta)} />
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                                style={{ width: columnWidths.emailStatus }}
                                onClick={() => handleSort("emailStatus")}
                            >
                                <div className="flex items-center gap-2">
                                    <span>Email Waterfall</span>
                                    <SortIcon field="emailStatus" sortField={sortField} sortDirection={sortDirection} />
                                </div>
                                <ResizeHandle onResize={(delta) => handleColumnResize('emailStatus', delta)} />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {groupBy !== "none" && groupedData ? (
                            // Grouped view
                            Object.entries(groupedData).map(([groupKey, rows]) => (
                                <React.Fragment key={groupKey}>
                                    {/* Group Header */}
                                    <TableRow
                                        className="bg-gray-100 dark:bg-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                                        onClick={() => toggleGroup(groupKey)}
                                    >
                                        <TableCell colSpan={8} className="py-2">
                                            <div className="flex items-center gap-2 font-medium">
                                                {collapsedGroups.has(groupKey) ? (
                                                    <ChevronRight className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                                <span>{groupBy === "emailStatus" ? (groupKey === "found" ? "Email Found" : "Run condition not met") : groupKey}</span>
                                                <span className="text-gray-500 text-sm">({rows.length})</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    {/* Group Rows */}
                                    {!collapsedGroups.has(groupKey) && rows.map(row => renderRow(row))}
                                </React.Fragment>
                            ))
                        ) : (
                            // Normal view
                            paginatedData.map(row => renderRow(row))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {groupBy === "none" && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-0 bg-white dark:bg-gray-900 border-t">
                    <div className="flex items-center justify-between sm:justify-start gap-2">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Rows per page:</span>
                        <Select
                            value={pageSize.toString()}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value))
                                setCurrentPage(1)
                            }}
                            className="w-16 sm:w-20 text-sm"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="flex items-center gap-0.5 sm:gap-1">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8"
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronsLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8"
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronsRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Context Menu */}
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={() => setContextMenu(null)}
                    onView={() => alert(`View details for row ${contextMenu.rowId}`)}
                    onEdit={() => {
                        const row = data.find(r => r.id === contextMenu.rowId)
                        if (row) handleStartEdit(row.id, "name", row.name)
                    }}
                    onDelete={() => handleDelete(contextMenu.rowId)}
                    onCopy={() => handleCopyRow(contextMenu.rowId)}
                    onOpenLink={() => {
                        const row = data.find(r => r.id === contextMenu.rowId)
                        if (row?.website) window.open(row.website, '_blank')
                    }}
                    onSendEmail={() => alert(`Send email to row ${contextMenu.rowId}`)}
                />
            )}
        </div>
    )
}
