import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupSchema } from "@/schema/signup.schema.js";
import { useSignup } from "@/hooks/useSignup.hook.js";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";


export default function Signup(){
  const {mutate, isPending, isError, isSuccess} = useSignup();

  const form = useForm({
    resolver: zodResolver(SignupSchema),
  });

  function onSubmit(values){
    mutate(values);
    form.reset();
  }

  useEffect(() => {
    if(isSuccess){
      toast(
        <div className="space-y-2 flex flex-row">
        <div>
          <h2  className="text-base font-semibold">User Created Successfully</h2>
          <p className="text-sm text-muted-foreground">You can now login and start creating tasks</p>
        </div>
        <Button variant="secondary">
          <Link to='/'>Login Here</Link>
        </Button>
      </div>
      );
    }
  },[isSuccess]);

  useEffect(() => {
    if(isError){
      toast.error("Uh Ho! Your request failed",{
        description: "Possibly the user already exists"
      });
    }
  },[isError]);

  return (
  <>
   <section className="flex flex-row w-full max-w-screen-xl min-h-screen justify-center items-center">
    <div className="w-4/12">
    <Card> 
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create a new account to start creating tasks</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField 
              control = {form.control}
              name = "firstName"
              render = {({field}) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input placeholder="First Name" {...field} value={field.value ?? ""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control = {form.control}
              name = "lastName"
              render = {({field}) => (
                <FormItem className="mb-4">
                  <FormControl>
                  <Input placeholder="Last Name"  {...field} value={field.value ?? ""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control = {form.control}
              name = "email"
              render = {({field}) => (
                <FormItem className="mb-4">
                  <FormControl>
                  <Input placeholder="Email"  {...field} value={field.value ?? ""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control = {form.control}
              name = "password"
              render = {({field}) => (
                <FormItem className="mb-4">
                  <FormControl>
                  <Input placeholder="Password"  {...field} value={field.value ?? ""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-row justify-between">
            <p className="basis-1/2">
              Already have an account?{" "}
              <Link to="/" className="hover:text-blue-500">
              Login Here
              </Link>
            </p>
            <Button type="submit">
              Signup
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
    </div>
    <Toaster position="top-center" duration={8000}/>
   </section>
  </>
);
}