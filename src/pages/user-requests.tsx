import { DataTable } from "@/components/ui/data-table";
import { selectUserRequests, setUserRequests } from "@/redux/request-slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/user-slice";
import { useEffect } from "react";
import { columns } from "@/components/columns";

const UserRequestsPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const requests = useAppSelector(selectUserRequests);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    dispatch(setUserRequests({ userId: user?.id! }));
  }, [dispatch, user?.id]);

  return (
    <main className="w-full p-3 space-y-3">
      <h1 className="text-5xl font-bold">User requests</h1>
      <DataTable columns={columns} data={requests} />
    </main>
  );
};

export default UserRequestsPage;
