import { component$, Slot, useContextProvider, useSignal } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import Footer from "~/components/footer/footer";
import Navbar from "~/components/navbar/navbar";
import { prisma } from "~/lib/helpers";
import { CartLengthContext } from "~/lib/store";

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export const useCartLength = routeLoader$(async () => {
    const cartLength = await prisma.cartItem.count();
    return cartLength;
});

export default component$(() => {
    const cartLength = useCartLength();
    const cartStore = useSignal(cartLength.value);
    useContextProvider(CartLengthContext, cartStore);
    return (
        <div class="flex flex-col justify-between min-h-screen">
            <main>
                <Navbar />
                <Slot />
                <Footer />
            </main>
        </div>
    );
});
