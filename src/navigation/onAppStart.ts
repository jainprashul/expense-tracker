import { store } from "@/store";
import { fetchCategories } from "@/store/context/expenseSlice";

export default function onAppStart(){

  store.dispatch(fetchCategories())

}