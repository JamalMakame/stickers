import { CartItem } from "./types";
import {  PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();



export function getCartSubTotal(cartItems:CartItem[]){
    return cartItems.reduce(
        (acc:number, cartItem:CartItem) => 
        acc + cartItem.stickerPrice * cartItem.quantity, 0
        )
}