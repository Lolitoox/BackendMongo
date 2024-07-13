import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

const update = async (query, data) => {
  return await cartModel.findOneAndUpdate(query, data, { new: true });
};

export default {
  getById,
  create,
  update,
};