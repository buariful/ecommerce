import React from "react";
import ReactStars from "react-rating-stars-component";
import productImage from "../images/hoodie-2.jpg";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, price, ratings, numOfReviews } = product;

  const options = {
    edit: false,
    color: "#645a5ac4",
    activeColor: "#ef6300",
    size: window.innerWidth < 768 ? 15 : 20,
    value: ratings,
    isHalf: true,
  };
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-[#06aed52e] p-2 md:p-4 rounded-lg hover:-translate-y-6 duration-300 ease-out">
        <img
          src={productImage}
          alt="product"
          className="w-36 md:w-42 mx-auto rounded-md mb-3"
        />
        <h3 className="font-medium">{name}</h3>
        <div className="flex justify-between items-center">
          <ReactStars {...options}></ReactStars>
          <small>({numOfReviews} reviews)</small>
        </div>
        <h3 className="font-semibold text-2xl">${price}</h3>
      </div>
    </Link>
  );
};

export default ProductCard;
