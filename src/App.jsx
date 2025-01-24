import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Dashboard, { actionDashboard, loadDashboard } from './pages/Dashboard'
import Error from './pages/Error'
import Main, { loadMain } from './layouts/main'
import { logoutAction } from './actions/logout'
import { ToastContainer } from 'react-toastify';
import Expenses, { actionExpenses, loadExpenses } from './pages/Expenses'
import Budget, { actionBudget, loadBudget } from './pages/Budget'
import { deleteBudget } from './actions/deleteBudget'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: loadMain,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
        loader: loadDashboard,
        action: actionDashboard,
        errorElement: <Error />
      },
      {
        path: "expenses",
        element: <Expenses />,
        loader: loadExpenses,
        action: actionExpenses,
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        element: <Budget />,
        loader: loadBudget,
        action: actionBudget,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget
          }
        ]
      },
      {
        path: "about",
        element: <p>About</p>
      }, {
        path: "logout",
        action: logoutAction
      }]
  },
])

function App() {

  return <div className='App'>
    <RouterProvider router={router} />
    <ToastContainer />
  </div>

}

export default App
