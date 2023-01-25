import CategoryItem from "./CategoryItem";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategoriesSuccess, hideLoad, showLoad } from "../store/actions/actionCreator";
import Loader from "./Loader";

function Categories() {

  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);

  useEffect(()=>{
    // dispatch(showLoad())
    dispatch(fetchCategoriesSuccess())
      .then(_=>{
        setLoad(false);
        // dispatch(hideLoad())
      })
  }, [])

  if (load) { return <Loader/>}
  return (
    <section id="category-section">
      <div className="flex text-4xl font-bold w-5/6 mx-auto my-12 justify-between items-center">
        <h1>Categories</h1>
        <Link to="/categories/add" className="text-xl bg-black text-white p-3 rounded-2xl">+ New Categories</Link>
      </div>
      <div className="overflow-x-auto relative sm:rounded-lg">
        <table className="w-5/6 text-sm text-left text-gray-500 mx-auto text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                No
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Created At
              </th>
              <th scope="col" className="py-3 px-6">
                Updated At
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index)=>{
              return <CategoryItem key={category.id} category={category} index={index}/>
            })}
            
          </tbody>
        </table>
      </div>
    </section>

  );
}

export default Categories;