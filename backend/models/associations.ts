import User from "./userModel";
import Cart from "./cartModel";
import Product from "./productModel";
import CartProduct from "./cartProductModel";

//Users can have multiple carts (one-to-many)
User.hasMany(Cart, { foreignKey: "userId" });

//Each cart is linked to a user(many-to-one)
Cart.belongsTo(User, { foreignKey: "userId" });

//Cart contain many products (many-to-many)
Cart.belongsToMany(Product, { through: CartProduct, foreignKey: "cartId" });

//Products can be in multiple cars(many-to-many)
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: "productId" });

export {User, Cart, Product, CartProduct}
