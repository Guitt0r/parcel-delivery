import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";

const CreatePage = () => {
  const pathname = useLocation().pathname;
  console.log(pathname);
  return (
    <>
      <Card className="max-w-[500px] mx-auto">
        <CardHeader className="text-2xl text-center font-bold">
          Choose the type of request you want to create
        </CardHeader>
        <CardContent className="flex justify-center gap-x-2">
          <Button asChild className="w-full text-lg">
            <Link to={`${pathname}/order`}>Order</Link>
          </Button>
          <Button asChild className="w-full text-lg">
            <Link to={`${pathname}/deliver`}>Delivery</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default CreatePage;
