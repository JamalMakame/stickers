import { component$, useContextProvider, useStore, useTask$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import CartTable from "~/components/cart-table/cart-table";
import PageTitle from "~/components/page-title/page-title";
import { prisma } from "~/lib/helpers";
import { cartContext } from "~/lib/store";
import type { CartItem } from "~/lib/types";

export const useCartItems = routeLoader$<CartItem[]>(async () => {
    const cartItems = await prisma.cartItem.findMany();
    return cartItems;
});

export default component$(() => {
    const loadedCartItems = useCartItems();
    const cartItems = useStore<CartItem[]>(loadedCartItems.value);
    useContextProvider(cartContext, cartItems);
    useTask$(({ track }) => {
        track(async () => {
            await prisma.cartItem.findMany();
        });
    });

    return (
        <>
            <div class="container mx-auto mb-20 min-h-screen">
                <PageTitle text="Your Cart" />
                <CartTable />
                <div class="max-w-sm mx-auto space-y-4 px-2">
                    <CheckOutButton />
                    <BackToStickersButton webUrl="/" />
                </div>
            </div>
        </>
    );
});

export const usedeteleCartItem = routeAction$(async () => {
    await prisma.cartItem.deleteMany();
});

export const CheckOutButton = component$(() => {
    const deleteCatItems = usedeteleCartItem();

    return (
        <Form action={deleteCatItems}>
            <button
                aria-label="checkout-stickers"
                class="bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
    justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
                onClick$={async () => {
                    await prisma.cartItem.deleteMany();
                }}
            >
                Checkout
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    class="w-6 ml-2 inline-flex"
                >
                    <path
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m15 11l4 4l-4 4m4-4H8a4 4 0 0 1 0-8h1"
                    />
                </svg>
            </button>
        </Form>
    );
});
export const BackToStickersButton = component$<{ webUrl: string }>(({ webUrl }) => {
    return (
        <Link
            href={webUrl}
            aria-label="back-to-stickers"
            class="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
            justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
        >
            Back to All Stickers
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="w-6 ml-2 inline-flex"
            >
                <path
                    fill="none"
                    stroke="#5b21b6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m9 11l-4 4l4 4m-4-4h11a4 4 0 0 0 0-8h-1"
                />
            </svg>
        </Link>
    );
});
