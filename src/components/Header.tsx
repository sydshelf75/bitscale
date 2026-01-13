"use client"

import { Home, Star, ChevronRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Header() {
    return (
        <div className="flex flex-col border-b">
            {/* Top Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between px-2 sm:px-4 py-2 border-b bg-white dark:bg-gray-900 gap-2">
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink">
                    {/* Home Icon */}
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                        <Home className="h-4 w-4" />
                    </Button>

                    {/* Star/Favorite */}
                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </Button>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1 text-xs sm:text-sm min-w-0">
                        <span className="text-gray-600 dark:text-gray-400 truncate max-w-[100px] sm:max-w-[200px] md:max-w-none">Workbook - Bitscale UX /UI testing flow</span>
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400 truncate">Bitscale grid o*</span>
                    </div>
                </div>

                {/* Center: Progress Bar - Hidden on mobile, visible on md+ */}
                <div className="hidden md:flex items-center gap-2 lg:gap-3">
                    <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Grid running</span>
                    <div className="w-20 lg:w-32">
                        <Progress value={10} className="h-2 bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">10%</span>
                </div>

                {/* Right: Credits and Actions */}
                <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                        <MessageCircle className="h-4 w-4" />
                    </Button>
                    <div className="hidden xs:flex items-center gap-1 px-1.5 sm:px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-xs sm:text-sm font-medium">500/500</span>
                    </div>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm h-6 sm:h-7 px-2 sm:px-3">
                        Free
                    </Button>
                </div>
            </div>

            {/* Payment Warning Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-2 py-2 bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-900/30">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-center sm:text-left">
                    <span className="text-red-600 dark:text-red-400">Payment failed. 450,000 credits will permanently expire in 30 days</span>
                    <span className="text-amber-500">⚠</span>
                </div>
                <Button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 h-6 sm:h-7 px-3 sm:px-4 text-xs sm:text-sm font-medium flex-shrink-0">
                    Pay Now
                </Button>
            </div>
        </div>
    )
}
