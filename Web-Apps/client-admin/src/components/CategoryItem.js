import { useDispatch } from 'react-redux';
import { deleteCategory, fetchCategoriesSuccess, fetchCategoryDetail, hideLoad, showLoad } from '../store/actions/actionCreator';
import { useNavigate } from "react-router-dom";

function CategoryItem({category, index}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteHandler = () => {
    dispatch(deleteCategory(category.id))
  }

  const editHandler = ()=>{
    dispatch(showLoad());
    dispatch(fetchCategoryDetail(category.id))
      .then(_=>{
        navigate('/categories/edit');
        dispatch(hideLoad());
      })
  }

  return (
    <tr className="bg-white border-b">
      <td className="py-4 px-6">
        {++index}.
      </td>
      <td className="py-4 px-6">
        {category.name}
      </td>
      <td className="py-4 px-6">
        {category.createdAt}
      </td>
      <td className="py-4 px-6">
      {category.updatedAt}
      </td>
      <td className="py-4 px-6">
        <a onClick={editHandler} className="cursor-pointer mx-2 font-medium text-blue-600 hover:underline">Edit</a>
        <a onClick={deleteHandler} className="cursor-pointer mx-2 font-medium text-red-600 hover:underline">Delete</a>
      </td>
    </tr>

  );
}

export default CategoryItem;