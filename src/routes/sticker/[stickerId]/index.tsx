import {
    component$,
    createContextId,
    useContext,
    useContextProvider,
    useStore,
} from "@builder.io/qwik";
import { Form, Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";

import { Price } from "~/components/sticker-card/sticker-card";
import ProductSection from "~/components/sticker-section/sticker-section";
import { prisma } from "~/lib/helpers";
import { productListings } from "~/lib/mock-data";
import type { ProductListingsProps } from "~/lib/types";
import { useAuthSession } from "~/routes/plugin@auth";

export const useSticker = routeLoader$(async ({ params }) => {
    const stickerId = params.stickerId;
    const sticker = productListings.meta.find((sticker) => sticker.id === stickerId);
    return sticker as ProductListingsProps;
});

export const StickerContext = createContextId<{ meta: ProductListingsProps }>("stickerContext");

export default component$(() => {
    const sticker = useSticker();
    useContextProvider(StickerContext, useStore({ meta: sticker.value }));
    return (
        <div class="min-h-screen py-12 sm:pt-20">
            <div class="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
                <ProductSection />
                <div class="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
                    <Link
                        href="/"
                        aria-label="back-to-products"
                        class="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 mr-2 inline-flex"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#5b21b6"
                                d="M12 9.059V6.5a1.001 1.001 0 0 0-1.707-.708L4 12l6.293 6.207a.997.997 0 0 0 1.414 0A.999.999 0 0 0 12 17.5v-2.489c2.75.068 5.755.566 8 3.989v-1c0-4.633-3.5-8.443-8-8.941z"
                            />
                        </svg>
                        Back To All Stickers
                    </Link>
                    <StickerInfo />
                    <StickerForm />
                </div>
            </div>
        </div>
    );
});

export const StickerInfo = component$(() => {
    const sticker = useContext(StickerContext);
    return (
        <div class="font-primary">
            <h1 class="leading-relaxed font-extrabold text-3xl text-palette-primary py-2 sm:py-4">
                {sticker.meta.name}
            </h1>
            <p class="font-medium text-lg">{sticker.meta.description}</p>
            <div class="text-xl text-palette-primary font-medium py-4 px-1">
                <Price currency="$" num={sticker.meta.price} numSize="text-2xl" />
            </div>
        </div>
    );
});

export const useSubmitSticker = routeAction$(async (data) => {
    const stickerId = data.stickerId;

    const sticker = productListings.meta.find((sticker) => sticker.id === stickerId);

    await prisma.cartItem.create({
        data: {
            stickerName: sticker?.name as string,
            stickerImage: sticker?.image as string,
            stickerPrice: sticker?.price as number,
            stickerSize: data.stickerSize as string,
            quantity: parseInt(data.quantity as string),
            stickerId: stickerId as string,
            user: {
                connect: {
                    id: "cliz3k8ip0000v4iwq0nvx6sx",
                },
            },
        },
    });
});

export const StickerForm = component$(() => {
    const submitSticker = useSubmitSticker();
    const sticker = useContext(StickerContext);
    const session = useAuthSession();
    return (
        <div class="w-full">
            <Form action={submitSticker}>
                <input type="text" hidden name="stickerId" value={sticker.meta.id} />
                <div class="flex justify-start space-x-2 w-full">
                    <div class="flex flex-col items-start space-y-1 flex-grow-0">
                        <label for="quantity" class="text-gray-500 text-base">
                            Qty.
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            id="quantity"
                            name="quantity"
                            min={1}
                            step={1}
                            value={1}
                            class="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light p-2"
                        />
                    </div>
                    <div class="flex flex-col items-start space-y-1 flex-grow">
                        <label for="stickerSize" class="text-gray-500 text-base">
                            Size
                        </label>
                        <select
                            name="stickerSize"
                            id="stickerSize"
                            class="form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-palette-light focus:ring-palette-light p-2"
                        >
                            <option value="3x3">3x3</option>
                            <option value="4x4">4x4</option>
                            <option value="5x5">5x5</option>
                        </select>
                    </div>
                </div>
                {session.value?.user ? (
                    <button
                        type="submit"
                        class="pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
                      justify-center items-baseline  hover:bg-palette-dark"
                        aria-label="cart-button"
                    >
                        Add To Cart
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 ml-2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="white"
                                d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25c0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2Z"
                            />
                        </svg>
                    </button>
                ) : (
                    <button
                        type="button"
                        class="pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
                        justify-center items-baseline  hover:bg-palette-dark opacity-25 "
                        aria-label="cart-button"
                        onClick$={() => {
                            alert("You must be logged in to add Stickers to Cart");
                        }}
                    >
                        Add To Cart
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 ml-2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="white"
                                d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25c0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2Z"
                            />
                        </svg>
                    </button>
                )}
            </Form>
        </div>
    );
});
