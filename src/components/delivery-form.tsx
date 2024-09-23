import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { nanoid } from "nanoid";
import { addRequest, changeRequest } from "@/redux/request-slice";
import { Request } from "@/types";
import { selectUser } from "@/redux/user-slice";
import { toast } from "sonner";

export const DeliverySchema = z.object({
  cityFrom: z.string().min(1, {
    message: "Please provide the city from which the parcel is sent",
  }),
  cityTo: z
    .string()
    .min(1, { message: "Please provide the city to which the parcel is sent" }),
  dispatchDate: z.date({
    required_error: "Please provide date of parcel dispatch",
  }),
});

export const DeliveryForm = ({ req }: { req?: Request }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const form = useForm<z.infer<typeof DeliverySchema>>({
    resolver: zodResolver(DeliverySchema),
    defaultValues: {
      cityFrom: req?.cityFrom || "",
      cityTo: req?.cityTo || "",
      dispatchDate: req?.dispatchDate ? new Date(req?.dispatchDate) : undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof DeliverySchema>) => {
    const newRequest: Request = {
      id: nanoid(4),
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      userId: user?.id!,
      requestType: "delivery",
      ...values,
      dispatchDate: values.dispatchDate.toString(),
    };
    return req
      ? dispatch(
          changeRequest({
            id: req.id,
            userId: req.userId,
            requestType: req.requestType,
            ...values,
            dispatchDate: values.dispatchDate.toString(),
          })
        )
      : dispatch(addRequest(newRequest));
    form.reset();
    toast.success("Successfully created!")
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="cityFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>The city from which the parcel is sent</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="London" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cityTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>The city to which the parcel is sent</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="London" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dispatchDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of dispatch </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <div>Pick a dispatch date</div>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          {req ? "Save changes" : "Create delivery request"}
        </Button>
      </form>
    </Form>
  );
};
