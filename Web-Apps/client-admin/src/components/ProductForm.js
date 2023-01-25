import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct, fetchCategoriesSuccess, hideLoad, showLoad } from '../store/actions/actionCreator';
import Loader from './Loader';

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    mainImg: "",
    imgUrl: [
      {
        imgUrl: ""
      }
    ]
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { type } = useParams();
  const categories = useSelector((state) => state.category.categories);
  const currentProductToEdit = useSelector((state) => state.product.product);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    // dispatch(showLoad);
    dispatch(fetchCategoriesSuccess())
      .then(_ => {
        if(type === "edit"){
          const productToEdit = {...product};
          productToEdit.id = currentProductToEdit.id;
          productToEdit.name = currentProductToEdit.name;
          productToEdit.description = currentProductToEdit.description;
          productToEdit.price = currentProductToEdit.price;
          productToEdit.categoryId = currentProductToEdit.categoryId;
          productToEdit.mainImg = currentProductToEdit.mainImg;
          productToEdit.imgUrl = currentProductToEdit.Images;
          setProduct(productToEdit);
        }
        // dispatch(hideLoad);
        setLoad(false);
      })
  }, [])

  const onChangeHandler = (e) => {
    const newProduct = { ...product };
    if (e.target.name.split("-")[0] === "imgUrl") {
      newProduct.imgUrl[e.target.name.split("-")[1]].imgUrl = e.target.value;
    }
    else {
      newProduct[e.target.name] = e.target.value;
    }
    setProduct(newProduct);
  }

  const addMoreImages = ()=>{
    const newProduct = {...product};
    newProduct.imgUrl.push({
      imgUrl: ""
    });
    setProduct(newProduct);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(showLoad());
    if(type === "edit"){
      dispatch(editProduct(product))
      .then(_ => {
        setProduct({
          name: "",
          description: "",
          price: "",
          categoryId: "",
          mainImg: "",
          imgUrl: [
            {
              imgUrl: ""
            }
          ]
        })
        navigate('/products');
        dispatch(hideLoad());
      })
    }
    else{
      dispatch(addProduct(product))
        .then(_ => {
          setProduct({
            name: "",
            description: "",
            price: "",
            categoryId: "",
            mainImg: "",
            imgUrl: [
              {
                imgUrl: ""
              }
            ]
          })
          navigate('/products');
          dispatch(hideLoad());
        })
    }
  }

  if (load) { return <Loader/>}
  return (
    <section id="add-product-section">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold sm:text-3xl">
            Create New Product
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
                  placeholder="Enter Product Name"
                  value={product.name}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium">Description</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Product Description"
                  value={product.description}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div>
              <label htmlFor="price" className="text-sm font-medium">Price</label>

              <div className="relative mt-1">
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Product Price"
                  value={product.price}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="text-sm font-medium">Category</label>

              <div className="relative mt-1">
                <select className="p-4 pr-12 w-full rounded-lg border-gray-200 shadow-sm text-sm"
                  name="categoryId"
                  id="categoryId"
                  value={product.categoryId}
                  onChange={onChangeHandler}>
                  <option value="" disabled hidden>Choose...</option>
                  {
                    categories.map(category => {
                      return <option key={category.id} value={category.id}>{category.name}</option>
                    })
                  }
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="mainImg" className="text-sm font-medium">Product Main Image</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="mainImg"
                  name="mainImg"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Product Main Image Url"
                  value={product.mainImg}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            {product.imgUrl.map((img, index) => {
              return <div key={index} className="relative mt-1">
                <input
                  type="text"
                  id="imgUrl"
                  name={`imgUrl-${index}`}
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Product Image Url"
                  value={img.imgUrl}
                  onChange={onChangeHandler}
                />
              </div>
            })}
            {type==="edit"?<></>:
            <p onClick={addMoreImages} className='inline-block hover:font-bold py-4 cursor-pointer'>Add More Images</p>
            }

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

export default ProductForm;