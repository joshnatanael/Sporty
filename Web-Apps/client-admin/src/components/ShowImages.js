import { useDispatch, useSelector } from "react-redux";
import { closeShowImages } from "../store/actions/actionCreator";

function ShowImages() {

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  return (
    <>
      <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between">
                  <p className="font-bold text-xl w-11/12">{product.name}</p>
                  <a onClick={() => dispatch(closeShowImages())}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828665.png" alt="close" className="w-6 h-6 rounded-md cursor-pointer border border-black p-1" />
                  </a>
                </div>
                <p>SKU #{product.id}</p>
                <p>IDR. {product.price}</p>
                <div className="lg:col-span-3">
                  <div className="relative mt-4">
                    <img alt="Product" src={product.mainImg} className="h-72 w-full rounded-xl object-cover lg:h-[540px] shadow-md mb-10" />
                  </div>
                  <ul className="mt-1 flex gap-1">
                    {product.Images.map(image => {
                      return <li key={image.id}>
                        <img alt="Product" src={image.imgUrl} className="h-16 w-16 rounded-md object-cover shadow-md" />
                      </li>
                    })}
                  </ul>
                </div>
                <div className="mt-6">
                  <p>Author: {product.User.email}</p>
                  <p>Category: {product.Category.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default ShowImages;