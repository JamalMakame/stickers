import {  Signal, createContextId, useStore } from "@builder.io/qwik";
import { CartItem, CartStore, ProductListingsProps } from "./types";


export const cartContext = createContextId<CartItem[]>(
    'cartContext'
);


export const productContext = createContextId<{ meta: ProductListingsProps[] }>("productsContext");


export const StickerContext = createContextId<{ meta: ProductListingsProps }>("stickerContext");

export const CartLengthContext = createContextId<Signal<number>>('cart-length-context');

export const totalPriceContext = createContextId<Signal<number>>('total-price-context');

