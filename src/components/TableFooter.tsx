"use client"

import { Plus, XCircle, PlayCircle, Copy, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TableFooter() {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-2 py-1.5 border-t bg-white dark:bg-gray-900 gap-2 sm:gap-0">
            {/* Left Side: Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto">
                {/* Add Grid Button */}
                <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">Grid</span>

                {/* Tabs */}
                <div className="flex items-center ml-1 sm:ml-2 overflow-x-auto scrollbar-hide">
                    <Button
                        variant="ghost"
                        className="h-6 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 rounded-md font-medium whitespace-nowrap flex-shrink-0"
                    >
                        Bitscale grid only
                    </Button>
                    <Button variant="ghost" className="h-6 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                        User Engagement...
                    </Button>
                    <Button variant="ghost" className="hidden md:flex h-6 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                        Customer Insights...
                    </Button>
                    <Button variant="ghost" className="hidden lg:flex h-6 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                        Audience Interact...
                    </Button>
                    <Button variant="ghost" className="hidden xl:flex h-6 sm:h-7 px-2 sm:px-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
                        Lead Generation...
                    </Button>
                    <span className="text-gray-400 mx-1 flex-shrink-0">&gt;</span>
                </div>
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 flex-shrink-0 overflow-x-auto">
                {/* Kill Run */}
                <Button variant="ghost" className="h-6 sm:h-7 gap-1 text-xs sm:text-sm text-red-500 flex-shrink-0">
                    <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">Kill Run</span>
                </Button>

                {/* Auto Run */}
                <Button variant="ghost" className="h-6 sm:h-7 gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
                    <PlayCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Auto Run</span>
                </Button>

                {/* Auto Dedupe */}
                <Button variant="ghost" className="hidden md:flex h-6 sm:h-7 gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                    Auto Dedupe
                </Button>

                {/* Support */}
                <Button variant="ghost" className="h-6 sm:h-7 gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
                    <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Support</span>
                </Button>
            </div>
        </div>
    )
}
