import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Products from "../components/Products";
import Categories from "../components/Categories";
import Register from "../components/Register";
import Login from "../components/Login";
import ProductForm from "../components/ProductForm";
import CategoryForm from "../components/CategoryForm";
import Root from "../components/Root";
import Swal from 'sweetalert2';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
    loader: ()=>{
      const token = localStorage.getItem("access_token");
      if(token){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          title: "Already signed in!",
          showConfirmButton: false,
          timer: 1500
        })
        return redirect('/');
      }
      return token;
    }
  },
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "",
        element: <Dashboard/>,
      },
      {
        path: "products",
        element: <Products/>,
      },
      {
        path: "categories",
        element: <Categories/>,
      },
      {
        path: "register",
        element: <Register/>,
      },
      {
        path: "products/:type",
        element: <ProductForm/>,
      },
      {
        path: "categories/:type",
        element: <CategoryForm/>,
      }
    ],
    loader: ()=>{
      const token = localStorage.getItem("access_token");
      if(!token){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          title: "Please signed in first!",
          showConfirmButton: false,
          timer: 1500
        })
        return redirect('/login');
      }
      return token;
    }
  }
]);

export default router;