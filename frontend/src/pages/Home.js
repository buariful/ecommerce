import React, { useEffect } from "react";
import FavText from "../components/FavText";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../actions/productActions";
import Loader from "../components/Loader";
import { ToastError } from "../components/PopupToast";

const Home = () => {
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      return ToastError(error);
    }
    dispatch(getProductAction());
  }, [dispatch, error]);

  return (
    <div>
      <FavText title="Ecommerce"></FavText>
      <SectionTitle heading="New Products"></SectionTitle>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div>
          {" "}
          <div className="flex flex-wrap justify-center items-center gap-8 w-11/12 md:w-10/12 mx-auto my-8">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id}></ProductCard>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
