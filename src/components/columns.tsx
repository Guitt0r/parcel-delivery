/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import {
  deleteRequest,
  selectMatchingRequests,
  setMathchingRequests,
} from "@/redux/request-slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Request } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, PenBoxIcon, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DataTable } from "./ui/data-table";
import { OrderForm } from "./order-form";
import { DeliveryForm } from "./delivery-form";

export const columns: ColumnDef<Request>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userId",
    header: "UserID",
  },
  {
    accessorKey: "requestType",
    header: "ReqType",
  },
  {
    accessorKey: "cityFrom",
    header: "City From",
  },
  {
    accessorKey: "cityTo",
    header: "City To",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "dispatchDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{new Date(row.getValue("dispatchDate")).toDateString()}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => {
      const dispatch = useAppDispatch();
      return (
        <Button
          onClick={() => dispatch(deleteRequest(row.original))}
          variant="destructive"
          size="icon"
        >
          <Trash2 className="size-5" />
        </Button>
      );
    },
  },
  {
    id: "edit",
    header: "Edit",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline" size="icon">
              <PenBoxIcon className="size-5" />
            </Button>
          </DialogTrigger>
          <DialogContent
            aria-describedby={undefined}
            className="bg-white w-[1500px]"
          >
            <DialogTitle>
              <DialogHeader>Edit request</DialogHeader>
              {row.original.requestType === "order" ? (
                <OrderForm req={row.original} />
              ) : (
                <DeliveryForm req={row.original} />
              )}
            </DialogTitle>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "More",
    header: "Show matching",
    cell: ({ row }) => {
      const dispatch = useAppDispatch();
      const matching = useAppSelector(selectMatchingRequests);
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                dispatch(setMathchingRequests(row.original))
              }
              className="w-full"
              variant="outline"
              size="icon"
            >
              <MoreHorizontal className="size-5" />
            </Button>
          </DialogTrigger>
          <DialogContent
            aria-describedby={undefined}
            className="bg-white w-[1500px]"
          >
            <DialogTitle>
              <DialogHeader>Matching requests</DialogHeader>
            </DialogTitle>
            <DataTable columns={columns_small} data={matching} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export const columns_small: ColumnDef<Request>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userId",
    header: "UserID",
  },
  {
    accessorKey: "requestType",
    header: "ReqType",
  },
  {
    accessorKey: "cityFrom",
    header: "City From",
  },
  {
    accessorKey: "cityTo",
    header: "City To",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "dispatchDate",
    header: "Date",
    cell: ({ row }) => {
      return <div>{new Date(row.getValue("dispatchDate")).toDateString()}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
