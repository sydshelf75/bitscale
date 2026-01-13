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
        <div className="absolute top-full left-0 sm:left-0 right-0 sm:right-auto mt-1 w-full sm:w-[400px] md:w-[500px] max-w-[calc(100vw-1rem)] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="font-medium text-sm sm:text-base">Filters</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="space-y-3">
                {filters.map((filter, index) => (
                    <div key={filter.id} className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-2">
                        {index > 0 && (
                            <span className="text-xs sm:text-sm text-gray-500 w-full sm:w-10">AND</span>
                        )}
                        <Select
                            value={filter.field}
                            onChange={(e) => updateFilter(filter.id, "field", e.target.value)}
                            className="w-full sm:w-24 md:w-28 text-sm"
                        >
                            {fields.map(f => (
                                <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                        </Select>
                        <Select
                            value={filter.operator}
                            onChange={(e) => updateFilter(filter.id, "operator", e.target.value)}
                            className="w-full sm:w-28 md:w-32 text-sm"
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
                                className="flex-1 min-w-0 text-sm"
                            />
                        )}
                        {filters.length > 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
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
                className="mt-3 text-xs sm:text-sm text-blue-600"
                onClick={addFilter}
            >
                <Plus className="h-4 w-4 mr-1" />
                Add filter
            </Button>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" onClick={handleClear} className="text-sm">
                    Clear all
                </Button>
                <Button onClick={handleApply} className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm">
                    Apply filters
                </Button>
            </div>
        </div>
    )
}
