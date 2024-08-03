import { fakerES as faker } from "@faker-js/faker";
import { productModel } from "../persistences/mongo/models/product.model.js";

export const generateProductsMocks = (amount) => {
  const products = [];

  for (let i = 0; i < amount; i++) {
    const product = {
      _id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
      stock: faker.number.int({ min: 0, max: 100 }),
    };

    products.push(product);
  }
  productModel.insertMany(products);

  return products;
};