"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EditingToolColumn = {
  id: string
  title: string
  createdAt: string
}

export const columns: ColumnDef<EditingToolColumn>[] = [
  {
    accessorKey: "title",
    header: "Software Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];