"use client"

import { useState } from "react"
import {
    Download,
    Filter,
    ArrowUpDown,
    ChevronDown,
    Settings,
    Columns
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterPanel } from "@/components/FilterPanel"

interface FilterCondition {
    id: string
    field: string
    operator: string
    value: string
}

export function Toolbar() {
    const [showFilter, setShowFilter] = useState(false)
    const [activeFilters, setActiveFilters] = useState<FilterCondition[]>([])

    const handleApplyFilters = (filters: FilterCondition[]) => {
        setActiveFilters(filters)
        // In a real app, this would be lifted to parent and passed to DataTable
        console.log("Applied filters:", filters)
    }

    return (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-gray-900">
            {/* Left Side Controls */}
            <div className="flex items-center gap-2">
                {/* Load Data Button */}
                <Button variant="outline" className="h-8 gap-2 text-sm">
                    <Download className="h-4 w-4" />
                    Load Data
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-xs">1</span>
                    <ChevronDown className="h-3 w-3" />
                </Button>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

                {/* Row Count */}
                <Button variant="ghost" className="h-8 gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Columns className="h-4 w-4" />
                    2000 Rows
                </Button>

                {/* Column Count */}
                <Button variant="ghost" className="h-8 gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Columns className="h-4 w-4 rotate-90" />
                    16/20 Columns
                </Button>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

                {/* Sort By */}
                <Button variant="ghost" className="h-8 gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort by
                </Button>

                {/* Filter */}
                <div className="relative">
                    <Button
                        variant="outline"
                        className={`h-8 gap-2 text-sm ${activeFilters.length > 0 ? 'border-emerald-500 text-emerald-600' : ''}`}
                        onClick={() => setShowFilter(!showFilter)}
                    >
                        <Filter className="h-4 w-4" />
                        Filter
                        {activeFilters.length > 0 ? (
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white text-xs">
                                {activeFilters.length}
                            </span>
                        ) : (
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-xs">1</span>
                        )}
                    </Button>
                    <FilterPanel
                        isOpen={showFilter}
                        onClose={() => setShowFilter(false)}
                        onApply={handleApplyFilters}
                    />
                </div>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2">
                {/* Action Button */}
                <Button variant="outline" className="h-8 gap-2 text-sm">
                    Action
                    <ChevronDown className="h-3 w-3" />
                </Button>

                {/* Enrichment Button */}
                <Button className="h-8 gap-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white">
                    <span className="text-lg leading-none">✦</span>
                    Enrichment
                    <ChevronDown className="h-3 w-3" />
                </Button>

                {/* Settings Button */}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
