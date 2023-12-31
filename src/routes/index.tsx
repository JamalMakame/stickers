import { component$, useContextProvider, useStore } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import ProductListings from "~/components/productListings/productListings";
import StoreHeader from "~/components/store-header/store-header";
import { productListings } from "~/lib/mock-data";
import { productContext } from "~/lib/store";

export const useProductListings = routeLoader$(async () => {
    return productListings;
});

export default component$(() => {
    const productListings = useProductListings();
    useContextProvider(productContext, useStore({ meta: productListings.value.meta }));
    return (
        <>
            <div class="mx-auto max-w-6xl">
                <StoreHeader />
                <ProductListings />
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "Stickers",
    meta: [
        {
            name: "description",
            content: "Qwik stickers for your laptop",
        },
    ],
};
