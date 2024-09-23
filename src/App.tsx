import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import UserRequestsPage from "./pages/user-requests";
import AllRequestsPage from "./pages/all-requests";
import CreatePage from "./pages/create-choice";
import OrderPage from "./pages/order";
import DeliverPage from "./pages/deliver";
import { AuthProvider } from "./providers/auth-provider";
import AuthPage from "./pages/auth";
import { Toaster } from "./components/ui/sonner";
import { useAppSelector } from "./redux/store";
import { selectUser } from "./redux/user-slice";

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <AuthProvider>
      <div className="font-main">
        <Header />
        <div className="mt-10">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/:id/requests" element={<UserRequestsPage />} />
            <Route path="/requests" element={<AllRequestsPage />} />
            <Route path="/:id/create" element={<CreatePage />} />
            <Route path="/:id/create/order" element={<OrderPage />} />
            <Route path="/:id/create/deliver" element={<DeliverPage />} />
            <Route
              path="/*"
              element={<Navigate to={`/${user?.id}/requests`} />}
            />
          </Routes>
        </div>
      </div>
      <Toaster richColors />
    </AuthProvider>
  );
};

export default App;
