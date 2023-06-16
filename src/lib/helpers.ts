import { CartItem } from "./types";




export function getCartSubTotal(cartItems:CartItem[]){
    return cartItems.reduce(
        (acc:number, cartItem:CartItem) => 
        acc + cartItem.stickerPrice * cartItem.quantity, 0
        )
}