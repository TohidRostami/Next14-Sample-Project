import React from 'react';
import ProductTable from './ProductTable';
import Banner from './Banner';
import ProductCategorySlider from './ProductCategorySlider'; 

const MainComponent = () => {
    return (
        <>
        <Banner />
        <ProductCategorySlider />
        <ProductTable />
        </>
    );
};

export default MainComponent;