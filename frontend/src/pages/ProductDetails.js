import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import { ToastError } from "../components/PopupToast";
import "./productDetails.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { description, name, numOfReviews, price, ratings, stock } = product;

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const options = {
    edit: false,
    color: "#645a5ac4",
    activeColor: "#ef6300",
    size: window.innerWidth < 768 ? 15 : 20,
    value: ratings,
    isHalf: true,
  };

  // get products details ==================================
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      return ToastError(error);
    }
    dispatch(getProductDetails(id));
    setTotalPrice(price);
  }, [dispatch, error, id, price]);

  // trigger when product quantity change ========================
  useEffect(() => {
    setTotalPrice(parseInt(quantity) * price);
  }, [quantity, price]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="flex justify-center flex-col-reverse md:flex-row my-8">
      <div className="w-full md:w-3/4 mx-auto">
        <Carousel className="mx-auto w-3/4 proDetailsCarousel">
          {product.images &&
            product.images.map((img, i) => (
              <img src={img.url} key={img.url} alt={"slide " + i} />
            ))}
        </Carousel>
      </div>

      <div className="w-full border-slate-400 md:border-l-2 p-8">
        <h2 className="font-bold text-3xl">
          {name}{" "}
          <small className="font-normal text-sm">(Product id #{id})</small>
        </h2>
        <p className="text-sm">{description}</p>
        <h2 className="mt-5 text-primary font-bold text-3xl">${totalPrice}</h2>
        <p
          className={`text-sm font-semibold ${
            stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          Stock: {stock > 0 ? stock : "Out of stock"}
        </p>
        <div className="border-t border-b border-slate-400 py-5 px-3 my-3 md:w-2/3 flex justify-between">
          <div className="flex items-center">
            <button
              className="px-3 py-1 bg-slate-400 text-white rounded-tl-md rounded-bl-md text-xl"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                } else {
                  ToastError("please enter right values");
                }
              }}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(v) => {
                if (
                  parseInt(v.target.value) > 0 &&
                  stock >= parseInt(v.target.value)
                ) {
                  setQuantity(v.target.value);
                } else if (stock < parseInt(v.target.value)) {
                  ToastError("Enter less than Our Stock");
                } else if (0 === parseInt(v.target.value)) {
                  ToastError("please enter right values");
                }
              }}
              className="border-2 border-slate-400 p-1 focus:outline-none  focus:border-cyan-800 w-1/3"
            />
            <button
              className="px-3 py-1 bg-slate-400 text-white rounded-tr-md rounded-br-md text-xl"
              onClick={() => {
                if (stock > quantity) {
                  setQuantity(parseInt(quantity) + 1);
                } else {
                  ToastError("Enter less than Our Stock");
                }
              }}
            >
              +
            </button>
          </div>
          <button className="bg-secondary text-white  text-sm border-none px-4 py-2 rounded-md hover:bg-pink-700">
            Add to cart
          </button>
        </div>
        <div className="flex items-center gap-3">
          <ReactStars {...options}></ReactStars>
          <small>({numOfReviews} reviews)</small>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
