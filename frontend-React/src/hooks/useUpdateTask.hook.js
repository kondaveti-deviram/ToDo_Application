import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

// Simulated function to post data to an API endpoint
const updateTask = async (task) => {
  /* get the token */
  const token = Cookies.get("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}tasks`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Custom hook for patching todos
export function useUpdateTask() {
  return useMutation({
    mutationFn: updateTask,
    onSuccess: (response) => {
      // This callback is triggered if the mutation is successful
      console.log(response);
    },
    onError: (error) => {
      // Handle error case
      console.error("Error updating task:", error);
    },
  });
}