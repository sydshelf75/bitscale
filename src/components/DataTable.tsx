"use client"

import { ChevronRight, Link as LinkIcon, User, CheckCircle2, XCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Sample data matching the design
const data = [
    { id: 1, name: "Mike Braham", date: "Oct 12, 2024 at 14:08 PM", company: "Google", companyLogo: "G", companyColor: "text-blue-500", website: "https://www.example.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 2, name: "Alex Johnson", date: "Oct 12, 2024 at 14:08 PM", company: "Amazon", companyLogo: "a", companyColor: "text-gray-800", website: "https://www.sample.com", linkedin: "https://www.linkedin.com...", emailStatus: "found", selected: true },
    { id: 3, name: "Sarah Thompson", date: "Oct 12, 2024 at 14:08 PM", company: "LinkedIn", companyLogo: "in", companyColor: "text-blue-600", website: "https://www.testsite.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 4, name: "David Lee", date: "Oct 12, 2024 at 14:08 PM", company: "Microsoft", companyLogo: "M", companyColor: "text-orange-500", website: "https://www.demo.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 5, name: "Emily Carter", date: "Oct 12, 2024 at 14:08 PM", company: "TED", companyLogo: "TED", companyColor: "text-red-600", website: "https://www.example...", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 6, name: "James Smith", date: "Oct 12, 2024 at 14:08 PM", company: "Unilever", companyLogo: "U", companyColor: "text-blue-700", website: "https://www.webpage.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 7, name: "Laura White", date: "Oct 12, 2024 at 14:08 PM", company: "Apple", companyLogo: "", companyColor: "text-gray-800", website: "https://www.mywebsite.c...", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 8, name: "Chris Brown", date: "Oct 12, 2024 at 14:08 PM", company: "Google", companyLogo: "G", companyColor: "text-blue-500", website: "https://www.newsite.com", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 9, name: "Jessica Green", date: "Oct 12, 2024 at 14:08 PM", company: "Unilever", companyLogo: "U", companyColor: "text-blue-700", website: "https://www.uniqueurl.com", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 10, name: "Daniel Harris", date: "Oct 12, 2024 at 14:08 PM", company: "Microsoft", companyLogo: "M", companyColor: "text-orange-500", website: "https://www.originalsite.c...", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 11, name: "Megan Clark", date: "Oct 12, 2024 at 14:08 PM", company: "Apple", companyLogo: "", companyColor: "text-gray-800", website: "https://www.freshpage.c...", linkedin: "https://www.linkedin.com...", emailStatus: "not_met" },
    { id: 12, name: "Brian Lewis", date: "Oct 12, 2024 at 14:08 PM", company: "TED", companyLogo: "TED", companyColor: "text-red-600", website: "https://www.differentdo...", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 13, name: "Samantha Hall", date: "Oct 12, 2024 at 14:08 PM", company: "Google", companyLogo: "G", companyColor: "text-blue-500", website: "https://www.alternativesi...", linkedin: "https://www.linkedin.com...", emailStatus: "found" },
    { id: 14, name: "Google", date: "", company: "", companyLogo: "", companyColor: "", website: "", linkedin: "", emailStatus: "" },
    { id: 15, name: "Amazon", date: "", company: "", companyLogo: "", companyColor: "", website: "", linkedin: "", emailStatus: "" },
    { id: 16, name: "LinkedIn", date: "", company: "", companyLogo: "", companyColor: "", website: "", linkedin: "", emailStatus: "" },
    { id: 17, name: "LinkedIn", date: "", company: "", companyLogo: "", companyColor: "", website: "", linkedin: "", emailStatus: "" },
    { id: 18, name: "LinkedIn", date: "", company: "", companyLogo: "", companyColor: "", website: "", linkedin: "", emailStatus: "" },
]

interface CompanyLogoProps {
    company: string
    logo: string
    color: string
}

function CompanyLogo({ company, logo, color }: CompanyLogoProps) {
    if (company === "Apple") {
        return <span className={`${color}`}></span>
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
        return <span className="text-gray-800 font-bold">a</span>
    }
    if (company === "Unilever") {
        return <span className="text-blue-700 font-bold">U</span>
    }
    return <span className={color}>{logo}</span>
}

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

export function DataTable() {
    return (
        <div className="flex-1 overflow-auto">
            <Table>
                <TableHeader className="bg-[#F0F6F0] sticky top-0">
                    <TableRow className="border-b">
                        <TableHead className="w-10 border-r">
                            <Checkbox />
                        </TableHead>
                        <TableHead className="w-10 text-center border-r">#</TableHead>
                        <TableHead className="min-w-[180px] border-r">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>Imported Data</span>
                                <ChevronRight className="h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead className="min-w-[160px] border-r">
                            <div className="flex items-center gap-2">
                                <LinkIcon className="h-4 w-4" />
                                <span>Last Updated At</span>
                            </div>
                        </TableHead>
                        <TableHead className="min-w-[140px] border-r">
                            <div className="flex items-center gap-2">
                                <LinkIcon className="h-4 w-4" />
                                <span>Company Name</span>
                            </div>
                        </TableHead>
                        <TableHead className="min-w-[180px] border-r">
                            <div className="flex items-center gap-2">
                                <LinkIcon className="h-4 w-4 text-emerald-500" />
                                <span>Company Website</span>
                            </div>
                        </TableHead>
                        <TableHead className="min-w-[180px] border-r">
                            <div className="flex items-center gap-2">
                                <LinkIcon className="h-4 w-4" />
                                <span>LinkedIn Job URL</span>
                            </div>
                        </TableHead>
                        <TableHead className="min-w-[160px]">
                            <div className="flex items-center gap-2">
                                <span>Email Waterfall</span>
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.id}
                            className={`${row.selected ? 'bg-blue-50 border border-blue-400' : ''}`}
                        >
                            <TableCell className="border-r">
                                <Checkbox defaultChecked={row.selected} />
                            </TableCell>
                            <TableCell className="text-center text-gray-500 border-r">{row.id}</TableCell>
                            <TableCell className="border-r">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User className="h-3 w-3 text-gray-500" />
                                    </div>
                                    <span className="text-blue-600">{row.name}</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-600 border-r">{row.date}</TableCell>
                            <TableCell className="border-r">
                                {row.company && (
                                    <div className="flex items-center gap-2">
                                        <CompanyLogo company={row.company} logo={row.companyLogo} color={row.companyColor} />
                                        <span>{row.company}</span>
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="border-r">
                                {row.website && (
                                    <div className="flex items-center gap-1 text-blue-600">
                                        <LinkIcon className="h-3 w-3" />
                                        <span className="truncate max-w-[150px]">{row.website}</span>
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="border-r">
                                {row.linkedin && (
                                    <div className="flex items-center gap-1 text-blue-600">
                                        <LinkIcon className="h-3 w-3" />
                                        <span className="truncate max-w-[150px]">{row.linkedin}</span>
                                    </div>
                                )}
                            </TableCell>
                            <TableCell>
                                <EmailStatusBadge status={row.emailStatus} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
