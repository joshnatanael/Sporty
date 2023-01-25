import { Link } from "react-router-dom";

function ProductCard({product}) {
  return (
    <li>
      <Link to={`/product/${product.slug}`} className="block overflow-hidden group">
        <img
          src={product.mainImg}
          alt=""
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />

        <div className="relative pt-3 bg-white">
          <h3
            className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4"
          >
            {product.name}
          </h3>

          <div className="mt-1.5 flex items-center justify-between text-gray-900">
            <p className="tracking-wide">IDR {product.price}</p>

          </div>
        </div>
      </Link>

    </li>
  );
}

export default ProductCard;