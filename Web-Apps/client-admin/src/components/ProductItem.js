import { useDispatch } from "react-redux";
import { deleteProduct, fetchProductDetail, fetchProductsSuccess, hideLoad, openShowImages, showLoad } from "../store/actions/actionCreator";
import { useNavigate } from "react-router-dom";

function ProductItem({ product, index }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = () => {
    dispatch(deleteProduct(product.id));
  }

  const editHandler = ()=>{
    dispatch(showLoad());
    dispatch(fetchProductDetail(product.id))
      .then(_=>{
        navigate('/products/edit')
        dispatch(hideLoad());
      })
  }

  return (
    <tr className="bg-white border-b">
      <td className="py-4 px-6">
        {index + 1}.
      </td>
      <td className="py-4 px-6">
        {product.name}
      </td>
      <td className="py-4 px-6">
        {product.categoryId}
      </td>
      <td className="py-4 px-6">
        IDR {product.price}
      </td>
      <td className="py-4 px-6">
        {product.createdAt}
      </td>
      <td className="py-4 px-6">
        <img src={product.mainImg} alt={product.slug}
          className="w-16 h-16 items-center object-cover rounded-full"
        />
      </td>
      <td className="py-4 px-2 w-1/6">
        <a onClick={()=>dispatch(openShowImages(product.id))} className="cursor-pointer font-medium text-sm bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-500">Show Images</a>
      </td>
      <td className="py-2 px-6">
        <a onClick={editHandler} className="cursor-pointer mx-2 font-medium text-blue-600 hover:underline">Edit</a>
        <a onClick={deleteHandler} className="cursor-pointer mx-2 font-medium text-red-600 hover:underline">Delete</a>
      </td>
    </tr>
  );
}

export default ProductItem;