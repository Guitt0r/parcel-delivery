import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "./ui/button";
import { logout, selectUser } from "@/redux/user-slice";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector(selectUser);
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <header
      className={cn(
        "sticky top-0 w-full p-4 flex items-center border-b-2",
        location.pathname === "/auth" && "hidden"
      )}
    >
      <div className="space-x-2">
        <Button asChild variant="outline">
          <Link to={`/${user?.id}/create`}>Create request</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={`/${user?.id}/requests`}>User requests</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={`/requests`}>All requests</Link>
        </Button>
      </div>
      <div className="ml-auto flex items-center">
        <p className="mr-2">Hello, {user?.username}!</p>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </header>
  );
};
