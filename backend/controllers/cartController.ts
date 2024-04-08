import { RequestHandler } from "express";
import { Cart, CartProduct, Product } from "../models/associations";
import { sequelize } from "../config/db";
import { Error as SequelizeError } from "sequelize";
import { calculateTotalPrice } from "../util/calculateTotalPrice";

export const addToCart: RequestHandler = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId, totalPrice: 0 });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartProduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartProduct) {
      await cartProduct.update({
        quantity: sequelize.literal(`quantity + ${quantity}`),
        price: product.price,
      });
    } else {
      await CartProduct.create({
        cartId: cart.id,
        productId,
        quantity,
        price: product.price,
      });
    }

    const totalPrice = await calculateTotalPrice(cart.id);

    res.status(200).json({
      message: "Product added to cart successfully",
      cart: {
        ...cart.toJSON(),
        totalPrice
      }
    });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while adding the product to the cart",
      error: error.message
    })
  }
};
