import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCategories, hideLoad, showLoad } from "../../store/action/actionCreator";
import Loader from "../Loader";

function Categories() {

  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);

  useEffect(()=>{
    // dispatch(showLoad());
    dispatch(fetchCategories())
      .then(_=>{
        setLoad(false);
        // dispatch(hideLoad());
      })
  }, [])

  if (load) { return <Loader/>}
  return (

    <>
      <section id="categories-section">
        <section>
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
            <header>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Categories.
              </h2>
            </header>

            <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
              {categories.map((category, index) => {
                let attribute = "";
                if ((index + 1) % 3 === 0) {
                  let row = (index + 1) / 3;
                  if (row > 1) {
                    row++;
                  }
                  attribute = "lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-" + row
                }
                return <li key={category.id} className={attribute}>
                  <span className="relative block group">
                    <img
                      src={category.imgUrl}
                      alt=""
                      className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                    />

                    <div
                      className="absolute inset-0 flex flex-col items-start justify-end p-6"
                    >
                      <h3 className="text-xl font-medium text-white">{category.name}</h3>

                      <Link to={`/categories/${category.name}`}
                        className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </span>
                </li>
              })}
            </ul>
          </div>
        </section>

      </section>
    </>
  );
}

export default Categories;