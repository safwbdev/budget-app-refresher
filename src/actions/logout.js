import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";
import { toast } from "react-toastify";
import { ROOT } from "../routes";

export async function logoutAction() {
    deleteItem({ key: "userName" })
    deleteItem({ key: "budgets" })
    deleteItem({ key: "expenses" })
    toast.success("You've logged out!")
    return redirect(ROOT)
}