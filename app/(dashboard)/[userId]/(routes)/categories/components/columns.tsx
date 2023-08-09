"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string
  name: string
  imageDescription: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "imageDescription",
    header: "Image Title",
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