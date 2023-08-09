"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ScenepackColumn = {
  id: string
  label: string
  credit: string
  isFeatured: boolean
  isApproved: boolean
  createdAt: string
}

export const columns: ColumnDef<ScenepackColumn>[] = [
  {
    accessorKey: "label",
    header: "Name",
  },
  {
    accessorKey: "credit",
    header: "Credits",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isApproved",
    header: "Aproved",
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