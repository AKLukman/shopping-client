import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Dashboard/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard";
import ShoppingList from "../pages/ShoppingList/ShoppingList";
import AllShopping from "../pages/ShoppingList/AllShopping/AllShopping";
import ViewShopping from "../pages/ShoppingList/ViewShoping/ViewShopping";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/addShopping",
        element: <ShoppingList></ShoppingList>,
      },
      {
        path: "/shoppinglist",
        element: <AllShopping></AllShopping>,
      },
      {
        path: "/viewShoppinglist/:id",
        element: <ViewShopping></ViewShopping>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/shopping/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;
