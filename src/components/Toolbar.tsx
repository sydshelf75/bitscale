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
        <div className="flex flex-wrap items-center justify-between px-2 sm:px-4 py-2 gap-2 border-b bg-white dark:bg-gray-900">
            {/* Left Side Controls */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto flex-wrap sm:flex-nowrap">
                {/* Load Data Button */}
                <Button variant="outline" className="h-7 sm:h-8 gap-1 sm:gap-2 text-xs sm:text-sm flex-shrink-0">
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Load Data</span>
                    <span className="xs:hidden">Load</span>
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-xs">1</span>
                    <ChevronDown className="h-3 w-3" />
                </Button>

                {/* Divider - Hidden on mobile */}
                <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-gray-700" />

                {/* Row Count - Hidden on mobile */}
                <Button variant="ghost" className="hidden md:flex h-7 sm:h-8 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <Columns className="h-3 w-3 sm:h-4 sm:w-4" />
                    2000 Rows
                </Button>

                {/* Column Count - Hidden on mobile */}
                <Button variant="ghost" className="hidden lg:flex h-7 sm:h-8 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <Columns className="h-3 w-3 sm:h-4 sm:w-4 rotate-90" />
                    16/20 Columns
                </Button>

                {/* Divider - Hidden on mobile */}
                <div className="hidden md:block w-px h-6 bg-gray-200 dark:bg-gray-700" />

                {/* Sort By */}
                <Button variant="ghost" className="h-7 sm:h-8 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
                    <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Sort by</span>
                    <span className="sm:hidden">Sort</span>
                </Button>

                {/* Filter */}
                <div className="relative flex-shrink-0">
                    <Button
                        variant="outline"
                        className={`h-7 sm:h-8 gap-1 sm:gap-2 text-xs sm:text-sm ${activeFilters.length > 0 ? 'border-emerald-500 text-emerald-600' : ''}`}
                        onClick={() => setShowFilter(!showFilter)}
                    >
                        <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
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
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                {/* Action Button - Hidden on small mobile */}
                <Button variant="outline" className="hidden xs:flex h-7 sm:h-8 gap-1 sm:gap-2 text-xs sm:text-sm">
                    Action
                    <ChevronDown className="h-3 w-3" />
                </Button>

                {/* Enrichment Button */}
                <Button className="h-7 sm:h-8 gap-1 sm:gap-2 text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white">
                    <span className="text-base sm:text-lg leading-none">✦</span>
                    <span className="hidden xs:inline">Enrichment</span>
                    <ChevronDown className="h-3 w-3" />
                </Button>

                {/* Settings Button */}
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                    <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
            </div>
        </div>
    )
}
