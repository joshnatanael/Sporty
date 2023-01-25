import ProductCard from "../Home/ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProducts, showLoad, hideLoad } from '../../store/action/actionCreator';
import { useParams, Link } from 'react-router-dom';
import Loader from "../Loader";

function Home() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  let { categoryName } = useParams();
  const [load, setLoad] = useState(true);

  useEffect(()=>{
    // dispatch(showLoad());
    dispatch(fetchProducts(categoryName))
      .then(_=>{
        setLoad(false);
        // dispatch(hideLoad());
      })
  }, [])

  useEffect(()=>{
    setLoad(true);
    // dispatch(showLoad());
    dispatch(fetchProducts(categoryName))
      .then(_=>{
        // dispatch(hideLoad());
        setLoad(false);
      })
  }, [categoryName])

  if (load) { return <Loader/>}
  return (

    <>
      <section id="product-section">
        <section>
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl mb-8">
                Product Collection.
              </h2>
            </header>

            {categoryName?
            <div>
              <h1 className="text-3xl font-bold mt-12">{categoryName}</h1>
              <Link to="/" className="inline-block bg-black text-white p-2 mt-4 rounded-md hover:bg-gray-400">Show All Products</Link>
            </div>
            :
            <></>}

            <ul className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map(product => {
                return <ProductCard key={product.id} product={product} />
              })}
            </ul>
          </div>
        </section>

      </section>
    </>
  );
}

export default Home;