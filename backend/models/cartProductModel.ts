import {DataTypes, Model, Optional} from 'sequelize';
import {CartProductAttributes} from '../types/types';
import { sequelize } from '../config/db';


interface CartProductCreationAttributes extends Optional<CartProductAttributes, "id"> {};


class CartProduct extends Model<CartProductAttributes, CartProductCreationAttributes> 
    implements CartProductAttributes{
        public id!: number;
        public cartId!: number;
        public productId!: number;
        public quantity!: number;
        public price!: number;
    }

CartProduct.init({
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
cartId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'cart',
        key: 'id',
    },
},
productId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model: 'products',
        key: 'id',
    },
},
quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
},
price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
}
},{
    sequelize,
    modelName: "CartProduct",
    tableName: 'cart_products',
    timestamps: false,
    underscored: true,
})

export default CartProduct;