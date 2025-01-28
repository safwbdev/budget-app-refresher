import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helper";
import { ROOT } from "../routes";

export function deleteBudget({ params }) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        });

        const sharedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        });

        sharedExpenses.forEach((expense) => {
            deleteItem({
                key: "expenses",
                id: expense.id,
            });
        });

        toast.success("Budget has been deleted successfully!");
    } catch (e) {
        throw new Error("There was na issue deleting the  budget.");
    }
    return redirect(ROOT);
}