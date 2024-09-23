import { AuthForm } from "@/components/auth-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AuthPage = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <Card className="mx-auto w-[400px]">
        <CardHeader className="text-4xl font-black">Welcome!</CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default AuthPage;
