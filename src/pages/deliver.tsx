import { DeliveryForm } from "@/components/delivery-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DeliverPage = () => {
  return (
    <>
      <Card className="w-1/2 mx-auto">
        <CardHeader className="text-2xl font-bold text-center">
          Create new order request
        </CardHeader>
        <CardContent>
          <DeliveryForm />
        </CardContent>
      </Card>
    </>
  );
};

export default DeliverPage;
