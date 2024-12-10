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
import EmployeesActionModal from "./EmployeesActionModal"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import EmployeeCustomFilter from "./EmployeeCustomFilter"

const EmployeeListTable : React.FC<{data : [] , sn : number , mutate : () => void}> = ({
    data , 
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
            <div className="capitalize" data-src={row.original.image_path}>
                <Avatar className="h-8 w-8">
                {
                    <AvatarImage src={row.original.image_path ?? 'no image path'} alt={row.getValue("name")} /> 
                }
                </Avatar>
                <span className="mt-2 inline-block">
                    {row.getValue("name")}
                </span>
            </div>
            ),
        },
        {
            accessorKey: "email",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="!px-0"
                        >
                            Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="">{row.getValue("email")}</div>
            ),
        },
        {
            accessorKey: "mobile",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        className="!px-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Mobile
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize">{row.getValue("mobile")}</div>
            ),
        },
        {
            accessorKey: "gender",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        className="!px-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Gender
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="">{row.getValue("gender")}</div>
            ),
        },
        {
            accessorKey: "date_of_birth",
            header: ({ column } : { column : any }) => {
                return (
                    <Button
                        variant="ghost"
                        className="!px-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Date of Birth
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row  } : { row : any }) => (
            <div className="capitalize">{row.getValue("date_of_birth")}</div>
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
                customFilter={<EmployeeCustomFilter mutate={mutate} />}
            />
            <EmployeesActionModal
                mode="edit"
                initialData={selectedRow}
                mutate={mutate}
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </>
    )
}

export default EmployeeListTable