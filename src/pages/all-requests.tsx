import { DataTable } from "@/components/ui/data-table";
import { selectAllRequests } from "@/redux/request-slice";
import { useAppSelector } from "@/redux/store";
import { columns_small } from "@/components/columns";

const AllRequestsPage = () => {
  const requests = useAppSelector(selectAllRequests);
  return (
    <main className="w-full p-3 space-y-3">
      <h1 className="text-5xl font-bold">All requests</h1>
      <DataTable columns={columns_small} data={requests} />
    </main>
  );
};

export default AllRequestsPage;
