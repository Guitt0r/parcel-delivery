import { OrderForm } from "@/components/order-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const OrderPage = () => {
  return (
    <>
      <Card className="w-1/2 mx-auto">
        <CardHeader className="text-2xl font-bold text-center">
          Create new order request
        </CardHeader>
        <CardContent>
          <OrderForm />
        </CardContent>
      </Card>
    </>
  );
};

export default OrderPage;
