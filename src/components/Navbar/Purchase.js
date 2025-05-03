import { PostCart } from "../../Services/Fake_Store.js";

const Purchase = () =>{
    const cartId = 1;
    const userId = 1;

    const products = localStorage.getItem('cart');

    const cart = {
        id: cartId,
        userId: userId,
        products: products,
    }
    try{
        PostCart(cart);
        console.log("Compra realizada");
        localStorage.removeItem('cart');
        window.location.reload();
    }catch (error) {
        console.error('Error al enviar el carrito:', error);
    }
}

export default Purchase;