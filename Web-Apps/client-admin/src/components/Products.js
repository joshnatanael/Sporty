import ProductItem from "./ProductItem";
import ShowImages from "./ShowImages";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { fetchProductsSuccess } from "../store/actions/actionCreator";
import Loader from "./Loader";

function Products() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const showImagesOpened = useSelector((state => state.other.showImagesOpened));
  const [load, setLoad] = useState(true);
  
  useEffect(() => {
    dispatch(fetchProductsSuccess())
      .then(_=>{
        setLoad(false);
      })
  }, [])

  if (load) { return <Loader/>}
  return (
    <section id="products-section">
      <div className="flex text-4xl font-bold w-11/12 mx-auto my-12 justify-between items-center">
        <h1>Products</h1>
        <Link to="/products/add" className="text-xl bg-black text-white p-3 rounded-2xl">+ New Products</Link>
      </div>
      <div className="overflow-x-auto relative sm:rounded-lg">
        <table className="w-11/12 text-sm text-left text-gray-500 mx-auto text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                No
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Category
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Created At
              </th>
              <th scope="col" className="py-3 px-6">
                Main Image
              </th>
              <th scope="col" className="py-3 px-6">
                Images
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return <ProductItem key={product.id} product={product} index={index} />
            })}

          </tbody>
        </table>
      </div>
      {showImagesOpened ?
        <ShowImages /> :
        <></>
      }
    </section>

  );
}

export default Products;