import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { ProductAttributes } from "../types";


class Product extends Model<ProductAttributes> implements ProductAttributes{
    public id!: number; 
    public country!: string;
    public altitude!: string;
    public roasted!: Date;
    public region!: string;
    public variety!: string;
    public process!: string;
    public price!: number;
  
}

Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roasted: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variety: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    process: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'products', 
    timestamps: false, 
  });
  
  export default Product;