import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { CartAttributes } from "../types/types";
import User from "./userModel";
import Product from "./productModel";
import CartProduct from "./cartProductModel";

interface CartCreationAttributes extends Optional<CartAttributes, "id"> {}

class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number;
  public userId!: number;
  public totalPrice!: number;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      field: "user_id",
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "price",
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    modelName: "Cart",
    tableName: "cart",
    timestamps: false,
    underscored: true,
  }
);


export default Cart;
