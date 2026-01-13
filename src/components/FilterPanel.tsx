"use client"

import { useState } from "react"
import { Filter, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

interface FilterCondition {
    id: string
    field: string
    operator: string
    value: string
}

interface FilterPanelProps {
    isOpen: boolean
    onClose: () => void
    onApply: (filters: FilterCondition[]) => void
}

const fields = [
    { value: "name", label: "Name" },
    { value: "company", label: "Company" },
    { value: "website", label: "Website" },
    { value: "emailStatus", label: "Email Status" },
]

const operators = [
    { value: "contains", label: "Contains" },
    { value: "equals", label: "Equals" },
    { value: "startsWith", label: "Starts with" },
    { value: "endsWith", label: "Ends with" },
    { value: "isEmpty", label: "Is empty" },
    { value: "isNotEmpty", label: "Is not empty" },
]

export function FilterPanel({ isOpen, onClose, onApply }: FilterPanelProps) {
    const [filters, setFilters] = useState<FilterCondition[]>([
        { id: "1", field: "name", operator: "contains", value: "" }
    ])

    const addFilter = () => {
        setFilters([
            ...filters,
            { id: Date.now().toString(), field: "name", operator: "contains", value: "" }
        ])
    }

    const removeFilter = (id: string) => {
        setFilters(filters.filter(f => f.id !== id))
    }

    const updateFilter = (id: string, key: keyof FilterCondition, value: string) => {
        setFilters(filters.map(f =>
            f.id === id ? { ...f, [key]: value } : f
        ))
    }

    const handleApply = () => {
        onApply(filters.filter(f => f.value || f.operator === "isEmpty" || f.operator === "isNotEmpty"))
        onClose()
    }

    const handleClear = () => {
        setFilters([{ id: "1", field: "name", operator: "contains", value: "" }])
        onApply([])
    }

    if (!isOpen) return null

    return (
        <div className="absolute top-full left-0 mt-1 w-[500px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="font-medium">Filters</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="space-y-3">
                {filters.map((filter, index) => (
                    <div key={filter.id} className="flex items-center gap-2">
                        {index > 0 && (
                            <span className="text-sm text-gray-500 w-10">AND</span>
                        )}
                        <Select
                            value={filter.field}
                            onChange={(e) => updateFilter(filter.id, "field", e.target.value)}
                            className="w-28"
                        >
                            {fields.map(f => (
                                <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                        </Select>
                        <Select
                            value={filter.operator}
                            onChange={(e) => updateFilter(filter.id, "operator", e.target.value)}
                            className="w-32"
                        >
                            {operators.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </Select>
                        {filter.operator !== "isEmpty" && filter.operator !== "isNotEmpty" && (
                            <Input
                                value={filter.value}
                                onChange={(e) => updateFilter(filter.id, "value", e.target.value)}
                                placeholder="Value..."
                                className="flex-1"
                            />
                        )}
                        {filters.length > 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => removeFilter(filter.id)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            <Button
                variant="ghost"
                className="mt-3 text-sm text-blue-600"
                onClick={addFilter}
            >
                <Plus className="h-4 w-4 mr-1" />
                Add filter
            </Button>

            <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" onClick={handleClear}>
                    Clear all
                </Button>
                <Button onClick={handleApply} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Apply filters
                </Button>
            </div>
        </div>
    )
}
