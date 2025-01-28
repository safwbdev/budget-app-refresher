import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './App.css'
import Dashboard, { actionDashboard, loadDashboard } from './pages/Dashboard'
import Error from './pages/Error'
import Main, { loadMain } from './layouts/main'
import { logoutAction } from './actions/logout'
import { ToastContainer } from 'react-toastify';
import Expenses, { actionExpenses, loadExpenses } from './pages/Expenses'
import Budget, { actionBudget, loadBudget } from './pages/Budget'
import { deleteBudget } from './actions/deleteBudget'
import { ABOUT, BUDGET, DELETE, EXPENSES, LOGOUT, ROOT } from './routes'

const router = createBrowserRouter([
  {
    path: ROOT,
    element: <Main />,
    loader: loadMain,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: ROOT,
        element: <Dashboard />,
        loader: loadDashboard,
        action: actionDashboard,
        errorElement: <Error />
      },
      {
        path: EXPENSES,
        element: <Expenses />,
        loader: loadExpenses,
        action: actionExpenses,
        errorElement: <Error />
      },
      {
        path: `${BUDGET}/:id`,
        element: <Budget />,
        loader: loadBudget,
        action: actionBudget,
        errorElement: <Error />,
        children: [
          {
            path: DELETE,
            action: deleteBudget
          }
        ]
      },
      {
        path: ABOUT,
        element: <p>About</p>
      }, {
        path: LOGOUT,
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
