import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useUpdateTask } from "@/hooks/useUpdateTask.hook.js";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function Task(props) {
  const queryClient = useQueryClient();

  const {mutate, isSuccess} = useUpdateTask();
  const [progress, setProgress] = useState(false);

  const { title = "This is the default title",
    description = "This is the default description",
    status = "todo",
    priority = "normal",
    dueDate = new Date("2025-01-01T12:00:00.00Z"),
    id
  } = props;

  let formattedDate = dueDate.toLocaleDateString("en-GB" ,{
    day: "numeric",
    month: "short",
    year: "numeric"
  })

  useEffect(()=>{
    if(status === "inProgress"){
      setProgress(true);
    }
  }, [status])

  function handleProgressChange(value) {
    setProgress(value);
    mutate({ _id: id, status: value ? "inProgress" : "todo" });
    queryClient.invalidateQueries({
      queryKey: ["fetchTasks"],
      refetchType: "all", // refetch both active and inactive queries
    });
  }

  function handleTaskCompleted(value) {
    mutate({ _id: id, status: "completed" });
    queryClient.invalidateQueries({
      queryKey: ["fetchTasks"],
      refetchType: "all", // refetch both active and inactive queries
    });
  }

  return (
    <Card className="w-full mb-8">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="basis-2/3 leading-8">{title}</CardTitle>
        <div>
          <Badge className="mr-2" variant="outline">{formattedDate}</Badge>
          {priority === "normal" && (<Badge className="bg-blue-800" variant="outline">{priority}</Badge>)}
          {priority === "high" && (<Badge className="bg-red-800" variant="outline">{priority}</Badge>)}
          {priority === "low" && (<Badge className="bg-green-800" variant="outline">{priority}</Badge>)}
        </div>  
      </CardHeader>
      <CardContent>
      <CardDescription>
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <Switch  
          checked={progress}
          id="in-progress" 
          onCheckedChange={handleProgressChange}
          className="mr-4"/>
          <Label htmlFor="in-progress">In Progress</Label>
        </div>
        <Button onClick={handleTaskCompleted}>
          Completed
        </Button>
      </CardFooter>
    </Card>
  )
}
