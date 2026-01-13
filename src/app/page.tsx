import { Header } from "@/components/Header"
import { Toolbar } from "@/components/Toolbar"
import { DataTable } from "@/components/DataTable"
import { TableFooter } from "@/components/TableFooter"

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header with breadcrumb and warning banner */}
      <Header />

      {/* Toolbar with controls */}
      <Toolbar />

      {/* Main Data Table */}
      <DataTable />

      {/* Footer with tabs */}
      <TableFooter />
    </div>
  )
}
