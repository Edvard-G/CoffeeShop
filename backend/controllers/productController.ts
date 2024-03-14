import { Request, Response } from "express";
import Product from "../models/productModel";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
          res.status(500).send('An error occurred')
      }
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.json(product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
        res.status(500).send('An error occurred')
    }
  }
};
