import { Link } from "react-router-dom";
import Button from "./Button";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition duration-300 group">
      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <div className="h-64 bg-secondary flex items-center justify-center">
          <span className="text-7xl group-hover:scale-110 transition duration-200">
            <div>
              <img src={product.image} />
            </div>
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5">
        <p className="text-sm text-primary font-medium">{product.category}</p>

        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold mt-1 hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">₹{product.price}</span>

          <span className="text-sm text-muted">⭐ {product.rating}</span>
        </div>

        <Button className="w-full mt-4">Add to Cart</Button>
      </div>
    </div>
  );
}

export default ProductCard;
