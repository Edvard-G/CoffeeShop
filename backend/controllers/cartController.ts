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
    const newCartData = await sequelize.transaction(async (t) => {
      let cart = await Cart.findOrCreate({
        where: { userId },
        defaults: {
          userId,
          totalPrice: 0,
        },
        transaction: t,
      });

      const product = await Product.findByPk(productId, { transaction: t });
      if (!product) {
        throw new Error("Product not found");
      }

      const totalPrice = product.price * quantity;

      const cartProduct = await CartProduct.create(
        {
          cartId: cart[0].id, 
          productId,
          quantity,
          price: totalPrice,
        },
        { transaction: t }
      );

      return { cart: cart[0], cartProduct };
    });

    res.status(200).json({
      message: "Product added to cart successfully",
      data: newCartData,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while adding the product to the cart",
      error: error.message,
    });
  }
};
