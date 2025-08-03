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
import { LoginSchema } from "@/schema/login.schems.js";
import { useLogin } from "@/hooks/useLogin.hook.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Login(){

  const {mutate, isError, isSuccess} = useLogin();
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
      resolver: zodResolver(LoginSchema),
    });
  
  function onSubmit(values){
    mutate(values);
    form.reset();
  }

    useEffect(() => {
      if(isSuccess){
        setLogin(true);
      }
    }, [isSuccess]);

    useEffect(() => {
      if(login){
        navigate("/tasks");
      }
    }, [login]);

    useEffect(() => {
      if(isError){
        toast.error("Uh Ho! Your request failed",{
          description: "Please check your login details",
        })
      }
    }, [isError]);
  

  return (
  <>
   <section className="flex flex-row w-full max-w-screen-xl min-h-screen justify-center items-center">
    <div className="w-4/12">
    <Card> 
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login and create tasks</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
          <FormField 
              control = {form.control}
              name = "email"
              render = {({field}) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input placeholder="Email" {...field} value={field.value ?? ""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control = {form.control}
              name = "password"
              render = {({field}) => (
                <FormItem className="mb-4 ">    
                  <FormControl>
                    <Input placeholder="Password" {...field} value={field.value ?? ""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-row justify-between">
            <p className="basis-1/2">
              Don't have an account?{" "}
              <Link to="signup" className="hover:text-blue-500">
              Signup Here
              </Link>
            </p>
            <Button type="submit">
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
    </div>
    <Toaster position="top-center"/>
   </section>
  </>
);
}