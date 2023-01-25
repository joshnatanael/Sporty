import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategoriesSuccess, fetchProductsSuccess } from "../store/actions/actionCreator";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function Dashboard() {

  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);

  useEffect(()=>{
    dispatch(fetchProductsSuccess())
      .then(_=>{
        dispatch(fetchCategoriesSuccess())
          .then(_=>{
            setLoad(false);
          })
      })
  },[])

  if (load) { return <Loader/>}
  return (
    <section id="Dashboard-section">
      <h1 className="text-4xl font-extrabold text-center my-12">Dashboard</h1>

      <div className="flex justify-between w-2/3 mx-auto">

        <Link
          to="/products"
          className="group flex flex-col justify-between rounded-sm bg-white p-20 shadow-xl transition-shadow hover:shadow-lg"
        >
          <div>
            <h3 className="text-5xl font-bold">{products.length}</h3>
            <div className="mt-4 border-t-2 border-indigo-100 pt-2">
              <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
                Total Products
              </p>
            </div>
          </div>

          <div className="mt-16 inline-flex items-center">
            <p className="text-lg font-medium">See all products</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3 h-6 w-6 transform transition-transform group-hover:translate-x-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </Link>

        <Link
          to="/categories"
          className="group flex flex-col justify-between rounded-sm bg-white p-20 shadow-xl transition-shadow hover:shadow-lg"
        >
          <div>
            <h3 className="text-5xl font-bold">{categories.length}</h3>
            <div className="mt-4 border-t-2 border-indigo-100 pt-2">
              <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
                Total Categories
              </p>
            </div>
          </div>

          <div className="mt-16 inline-flex items-center">
            <p className="text-lg font-medium">See all categories</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3 h-6 w-6 transform transition-transform group-hover:translate-x-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </Link>

      </div>
    </section>
  );
}

export default Dashboard;