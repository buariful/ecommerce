import React from "react";
import Helmet from "react-helmet";
const FavText = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </div>
  );
};

export default FavText;
