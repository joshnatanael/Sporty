import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProductDetail, hideLoad, showLoad } from '../../store/action/actionCreator';
import Loader from '../Loader';

function ProductDetail() {

  const dispatch = useDispatch();
  const { slug } = useParams();
  const product = useSelector((state) => state.product.product);
  const [load, setLoad] = useState(true);


  useEffect(() => {
    // dispatch(showLoad());
    dispatch(fetchProductDetail(slug))
      .then(_ => {
        setLoad(false);
        // dispatch(hideLoad());
      })
  }, [])
  
  if (load) { return <Loader/>}
  return (
    <section id="product-detail-section">
      <section>
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div>
            <h1 className="text-4xl font-bold lg:text-3xl">{product.name}</h1>
            <h1 className="text-4xl lg:text-lg bg-black text-white inline-block my-1 rounded-full p-1">{product.Category.name}</h1>
            <p className="mt-1 text-lg text-gray-500">SKU: #{product.id}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-3">
              <div className="relative mt-4 mb-12 rounded-xl">
                <img
                  alt="Product"
                  src={product.mainImg}
                  className="h-72 w-3/4 rounded-xl object-cover lg:h-[800px] mx-auto"
                />
              </div>

              <ul className="mt-1 flex gap-10">
                {
                  product.Images.map(el => {
                    return <li key={el.id}>
                      <img
                        alt="Product"
                        src={el.imgUrl}
                        className="h-60 w-60 rounded-md object-cover border border-gray-300"
                      />
                    </li>
                  })
                }
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div
                className="prose max-w-none [&>iframe]:mt-6 [&>iframe]:aspect-video [&>iframe]:w-full [&>iframe]:rounded-xl"
              >
                <p className="text-2xl">
                  {product.description}
                </p>

                <p className="font-bold">
                  IDR {product.price}
                </p>
                <p>
                  Author: {product.User.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </section>
  );
}

export default ProductDetail;