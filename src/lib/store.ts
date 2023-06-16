import { createContextId, useStore } from "@builder.io/qwik";
import { CartItem } from "./types";


export const cartContext = createContextId<CartItem[]>(
    'cartContext'
);


