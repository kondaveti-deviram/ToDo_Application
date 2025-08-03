import { TaskPagination } from "../tasksPagination/tasksPagination.jsx";
import { OrderSelect } from "../orderSelect/orderSelect.jsx";

export function FilterBar(){
  return(
    <>
      <nav className="flex flex-row justify-between mb-8">
        <TaskPagination />
        <OrderSelect />
      </nav>
    </>
  );
}