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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { addRequest, changeRequest } from "@/redux/request-slice";
import { nanoid } from "nanoid";
import { selectUser } from "@/redux/user-slice";
import { Request } from "@/types";
import { toast } from "sonner";

const orderTypes = [
  "gadgets",
  "drinks",
  "clothes",
  "medicines",
  "other",
] as const;

export const OrderSchema = z.object({
  cityFrom: z.string().min(1, {
    message: "Please provide the city from which the parcel is sent",
  }),
  cityTo: z
    .string()
    .min(1, { message: "Please provide the city to which the parcel is sent" }),
  type: z.enum(orderTypes, {
    message: "Please provide parcel type",
  }),
  dispatchDate: z.date({
    required_error: "Please provide date of parcel dispatch",
  }),
  description: z
    .string()
    .min(1, { message: "Please provide parcel description" }),
});

export const OrderForm = ({ req }: { req?: Request }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      cityFrom: req?.cityFrom || "",
      cityTo: req?.cityTo || "",
      type: req?.type || undefined,
      dispatchDate: req?.dispatchDate ? new Date(req?.dispatchDate) : undefined,
      description: req?.description || "",
    },
  });

  const onSubmit = (values: z.infer<typeof OrderSchema>) => {
    const newRequest: Request = {
      id: nanoid(4),
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      userId: user?.id!,
      requestType: "order",
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
    toast.success("Successfully created!");
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parcel type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a parcel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {orderTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                          <span>Pick a dispatch date</span>
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Parcel description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          {req ? "Save changes" : "Create order request"}
        </Button>
      </form>
    </Form>
  );
};
