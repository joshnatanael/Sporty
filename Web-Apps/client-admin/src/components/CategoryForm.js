import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, editCategory, hideLoad, showLoad } from '../store/actions/actionCreator';

function CategoryForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryDetail = useSelector((state) => state.category.category);
  let { type } = useParams();

  const [category, setCategory] = useState({
    name: "",
    imgUrl: ""
  });

  const onChangeHandler = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (type === "edit") {
      setCategory({
        name: categoryDetail.name,
        imgUrl: categoryDetail.imgUrl
      })
    }
  }, [])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(showLoad())
    if(type === "add"){
      dispatch(addCategory(category))
        .then(_ => {
          setCategory({
            name: "",
            imgUrl: ""
          })
          navigate('/categories');
          dispatch(hideLoad())
        })
    }
    else{
      dispatch(editCategory(category, categoryDetail.id))
        .then(_ => {
          setCategory({
            name: "",
            imgUrl: ""
          })
          navigate('/categories');
          dispatch(hideLoad())
        })
    }
  }

  return (
    <section id="add-category-section">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold sm:text-3xl">
            Create New Category
          </h1>

          <form onSubmit={onSubmitHandler} className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">

            <div>
              <label htmlFor="name" className="text-sm font-medium">Name</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Category Name"
                  value={category.name}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div>
              <label htmlFor="imgUrl" className="text-sm font-medium">Category Image</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="imgUrl"
                  name="imgUrl"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Category Image"
                  value={category.imgUrl}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
            >
              Save
            </button>
          </form>
        </div>
      </div>

    </section>

  );
}

export default CategoryForm;