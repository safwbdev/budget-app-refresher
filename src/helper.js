export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const createBudget = ({ name, amount }) => {
    const newItem = { id: crypto.randomUUID(), name: name, createdAt: Date.now(), amount: +amount, color: generateRandomColor() }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = { id: crypto.randomUUID(), name: name, createdAt: Date.now(), amount: +amount, budgetId: budgetId }
    const existingExpennses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpennses, newItem]))
}

const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800))


export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, { style: "currency", currency: "USD" })
}

export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId) return acc;

        return acc += expense.amount;
    }, 0);
    return budgetSpent;
}

export const formstPercentage = (amt) => {
    return amt.toLocaleString(undefined, { style: "percent", minimumFractionDigits: 0 })
}

export const formatDateToLocaleString = (epoch) => {
    return new Date(epoch).toLocaleDateString()
}

export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
}
export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
};

export const confirmLogout = (event) => {
    if (!confirm("Log out?")) {
        event.preventDefault()
    }
}
export const confirmDeleteBudget = (event) => {
    if (!confirm("Are you sure you want to permanently delete this budget?")) {
        event.preventDefault();
    }
}
export const confirmDeleteExpense = (event) => {
    if (!confirm("Are you sure you want to permanently delete this expense?")) {
        event.preventDefault();
    }
}