import { createContextId, useStore } from "@builder.io/qwik";
import { CartItem, ProductListingsProps } from "./types";


export const cartContext = createContextId<CartItem[]>(
    'cartContext'
);


export const productContext = createContextId<{ meta: ProductListingsProps[] }>("productsContext");