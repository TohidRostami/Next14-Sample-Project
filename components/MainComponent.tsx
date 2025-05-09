import React from "react";
import ProductTable from "./ProductTable";
import Banner from "./Banner";
import ProductCategorySlider from "./ProductCategorySlider";
import ProductSlideshow from "./ProductSlideShow";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const MainComponent = () => {
  return (
    <>
      <Banner />
      <ProductCategorySlider />
      <ProductSlideshow />
      <ContactUs />
      <Footer />
      {/* <ProductTable /> */}
    </>
  );
};

export default MainComponent;
