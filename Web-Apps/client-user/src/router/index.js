import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Home from "../components/views/Home";
import Categories from "../components/views/Categories";
import ProductDetail from "../components/views/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "categories",
        element: <Categories/>,
      },
      {
        path: "categories/:categoryName",
        element: <Home/>,
      },
      {
        path: "product/:slug",
        element: <ProductDetail/>,
      }
    ]
  }
]);

export default router;