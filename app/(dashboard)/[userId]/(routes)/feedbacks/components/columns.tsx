"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type FeedbackColumn = {
  id: string
  userName: string
  message: string
  isFeatured: boolean
}

export const columns: ColumnDef<FeedbackColumn>[] = [
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "message",
    header: "Feedback Message",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];