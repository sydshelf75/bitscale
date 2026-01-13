"use client"

import { Plus, XCircle, PlayCircle, Copy, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TableFooter() {
    return (
        <div className="flex items-center justify-between px-2 py-1.5 border-t bg-white">
            {/* Left Side: Tabs */}
            <div className="flex items-center gap-1">
                {/* Add Grid Button */}
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">Grid</span>

                {/* Tabs */}
                <div className="flex items-center ml-2">
                    <Button
                        variant="ghost"
                        className="h-7 px-3 text-sm text-emerald-700 bg-emerald-50 rounded-md font-medium"
                    >
                        Bitscale grid only
                    </Button>
                    <Button variant="ghost" className="h-7 px-3 text-sm text-gray-600">
                        User Engagement...
                    </Button>
                    <Button variant="ghost" className="h-7 px-3 text-sm text-gray-600">
                        Customer Insights...
                    </Button>
                    <Button variant="ghost" className="h-7 px-3 text-sm text-gray-600">
                        Audience Interact...
                    </Button>
                    <Button variant="ghost" className="h-7 px-3 text-sm text-gray-600">
                        Lead Generation...
                    </Button>
                    <span className="text-gray-400 mx-1">&gt;</span>
                </div>
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-2">
                {/* Kill Run */}
                <Button variant="ghost" className="h-7 gap-1 text-sm text-red-500">
                    <XCircle className="h-4 w-4" />
                    Kill Run
                </Button>

                {/* Auto Run */}
                <Button variant="ghost" className="h-7 gap-1 text-sm text-gray-600">
                    <PlayCircle className="h-4 w-4" />
                    Auto Run
                </Button>

                {/* Auto Dedupe */}
                <Button variant="ghost" className="h-7 gap-1 text-sm text-gray-600">
                    <Copy className="h-4 w-4" />
                    Auto Dedupe
                </Button>

                {/* Support */}
                <Button variant="ghost" className="h-7 gap-1 text-sm text-gray-600">
                    <HelpCircle className="h-4 w-4" />
                    Support
                </Button>
            </div>
        </div>
    )
}
