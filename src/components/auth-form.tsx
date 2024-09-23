import { z } from "zod";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addUser, login, selectAllUsers } from "@/redux/user-slice";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const AuthSchema = z.object({
  username: z.string().min(1, { message: "Please provide an username" }),
  password: z.string().min(1, { message: "Please provide a passoword" }),
});

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);

  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AuthSchema>) => {
    const userToAuth = {
      id: nanoid(4),
      ...values,
    };
    const existingUser = users.find(
      (user) => user.username === userToAuth.username
    );

    if (!existingUser) {
      dispatch(addUser(userToAuth));
      dispatch(login(userToAuth));
    } else if (existingUser.password === userToAuth.password) {
      dispatch(login(existingUser));
    } else {
      form.setError("password", {
        message: "Invalid password",
        type: "validate",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="john_doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Authorize
        </Button>
      </form>
    </Form>
  );
};
