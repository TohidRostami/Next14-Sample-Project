class Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;

  constructor(
    prdctId: number,
    prdtTitle: string,
    prdtPrice: string,
    prdtCategory: string,
    prdtdesc: string,
    prdtImg: string
  ) {
    this.id = prdctId;
    this.title = prdtTitle;
    this.price = prdtPrice;
    this.category = prdtCategory;
    this.description = prdtdesc;
    this.image = prdtImg;
  }
}

export default Product;
