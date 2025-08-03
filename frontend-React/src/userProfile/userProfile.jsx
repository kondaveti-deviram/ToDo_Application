import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { TasksContext } from "@/context/tasks.context.jsx"
import { useContext } from "react"

export function UserProfile({firstName = "John"} =prop) {

  const { tasks, setTasks } = useContext(TasksContext);
  return(
    <div className="flex flex-col w-full pt-8 items-center">
      <Avatar className="mb-4">
          <AvatarFallback className="text-2xl font-semibold ">{firstName.slice(0,1)}</AvatarFallback>
      </Avatar>
      <h4>Hello, {firstName} </h4>
    </div>
  )
}