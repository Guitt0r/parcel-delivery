import { useAppSelector } from "@/redux/store";
import { selectUser } from "@/redux/user-slice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/auth" && user) {
      navigate(`/${user.id}/requests`);
    } else if (!user) {
      navigate("/auth");
    }
  }, [location.pathname, navigate, user]);
  return <>{children}</>;
};
