import { Input } from "@/components/ui/input.jsx"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, Files } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateTaskSchema } from "@/schema/createTask.schema.js";
import { useCreateTask } from "@/hooks/useCreateTask.hook.js";
import { useEffect } from "react"
import { Toaster } from "../ui/sonner.jsx"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"



export function CreateTaskForm() {
  const [date, setDate] = useState();
  const {mutate, isError, isSuccess, isPending} = useCreateTask();
  const queryClient = useQueryClient();

   const form = useForm({
      resolver: zodResolver(CreateTaskSchema),
    });
  
    function onSubmit(values){

      let dueDate = values.dueDate.toISOString();
      mutate({...values, dueDate});
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["fetchTasks"],
        refetchType: "all"
      })
    }

    useEffect(() => {
      if(isSuccess){
        toast("New task created");
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "fetchTasks",
        });
      }
    }, [isSuccess]);

    useEffect(() => {
      if(isError){
        toast.error("Uh Ho! Your request failed",{
          description: "Please try again",
        })
      }
    }, [isError]);

  return(
    <div>
      <h2 className="text-xl mb-4">
        Create a new task
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-2">
          <FormField 
              control = {form.control}
              name = "title"
              render = {({field}) => (
                <FormItem >
                  <FormControl>
                    <Input placeholder="Title" {...field} value={field.value ?? ""}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-rol justify-between py-2">
            <div className="mr-2 w-full">
              <FormField 
                control = {form.control}
                name = "status"
                render = {({field}) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="todo">Todo</SelectItem>
                          <SelectItem value="inProgress">In Progress</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="ml-2 w-full">
            <FormField 
                control = {form.control}
                name = "priority"
                render = {({field}) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="py-2">
          
            <FormField 
              control = {form.control}
              name = "dueDate"
              render = {({field}) => (
                <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !date&& "text-muted-foreground"
                        )}
                      >
                      <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Due Date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled = {(date)=> date < new Date()}
                        initialFocus
                      />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
              )} 
            />
            </div>

            <div className="py-2">
              <FormField 
                control = {form.control}
                name = "description"
                render = {({field}) => (
                  <FormItem >
                    <FormControl>
                      <Textarea placeholder="Description of the task " {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>

            <div className="py-2 flex justify-end">
              <Button type="submit">Create Task</Button>
            </div>
        </form>
      </Form>
      <Toaster position="top-center"/>
    </div>
  )
}