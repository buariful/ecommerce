import React from "react";
import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import { ToastError } from "../components/PopupToast";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      return ToastError(error);
    }

    dispatch(getProductDetails(id));
  }, [dispatch, error, id]);
  console.log(product);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Carousel>
          {product.images &&
            product.images.map((img, i) => (
              <img src={img.url} key={img.url} alt={"slide " + i} />
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductDetails;
