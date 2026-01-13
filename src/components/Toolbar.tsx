"use client"

import {
    Download,
    Filter,
    ArrowUpDown,
    ChevronDown,
    Settings,
    Columns
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function Toolbar() {
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
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
                <div className="w-px h-6 bg-gray-200" />

                {/* Row Count */}
                <Button variant="ghost" className="h-8 gap-2 text-sm text-gray-600">
                    <Columns className="h-4 w-4" />
                    2000 Rows
                </Button>

                {/* Column Count */}
                <Button variant="ghost" className="h-8 gap-2 text-sm text-gray-600">
                    <Columns className="h-4 w-4 rotate-90" />
                    16/20 Columns
                </Button>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-200" />

                {/* Sort By */}
                <Button variant="ghost" className="h-8 gap-2 text-sm text-gray-600">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort by
                </Button>

                {/* Filter */}
                <Button variant="outline" className="h-8 gap-2 text-sm">
                    <Filter className="h-4 w-4" />
                    Filter
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-xs">1</span>
                </Button>
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
