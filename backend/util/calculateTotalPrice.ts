import {Cart, CartProduct, Product} from '../models/associations'

export async function calculateTotalPrice(cartId: number): Promise<number> {
    const cartProducts = await CartProduct.findAll({
        where: { cartId: cartId },
        include: [{ model: Product, attributes: ['price'] }]
      });
    
      const total = cartProducts.reduce((sum, cartProduct) => {
        return sum + (cartProduct.quantity * cartProduct.price); 
      }, 0);
    
      await Cart.update({ totalPrice: total }, { where: { id: cartId } });
      
      return total;
}