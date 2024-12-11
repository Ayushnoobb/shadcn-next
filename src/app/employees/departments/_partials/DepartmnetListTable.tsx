import { DataTable } from "@/components/common/DataTable/DataTable"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
}  from "@/components/ui/dropdown-menu"
import { useState } from "react"
import DepartmentActionModal from "./DepartmenActionModal"

const DepartmentListTable : React.FC<{data : [] , sn : number , mutate : () => void}> = ({
    data , 
    sn , 
    mutate
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "sn",
            header: "sn",
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize" data-attr={JSON.stringify(row)}>{row.index + 1}</div>
            ),
        },
        {
            accessorKey: "name",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        className="!px-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "location",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="!px-0"
                        >
                            Location
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize">{row.getValue("location")}</div>
            ),
        },
        {
            accessorKey: "established_date",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        className="!px-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Established Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize">{row.getValue("established_date")}</div>
            ),
        },
        {
            accessorKey: "contact_number",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        className="!px-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Contact
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize">{row.getValue("contact_number")}</div>
            ),
        },
    ]

    return(
        <>
            <DataTable
                data={data}
                columns={columns}
                sn={1}
                searchKey="name"
                showCheckbox={false}
                mutate={mutate}
                actionDropdown={{
                    id: "actions",
                    enableHiding: false,
                    cell: ({ row } : {  row : any}) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Action</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          
                            <DropdownMenuItem onClick={() => {
                                setSelectedRow(row?.original) ; 
                                setIsModalOpen(true)
                            }} className="text-yellow-500">
                                <Pencil />
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                }}
                
            />
            <DepartmentActionModal
                mode="edit"
                initialData={selectedRow}
                mutate={mutate}
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </>
    )
}

export default DepartmentListTable