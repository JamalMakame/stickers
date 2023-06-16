import { component$, useContext } from "@builder.io/qwik";
import ProductCard from "../sticker-card/sticker-card";
import { productContext } from "~/lib/store";

export default component$(() => {
    const productListings = useContext(productContext);
    return (
        <div class="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {productListings.meta.map((productListing, index) => (
                <ProductCard
                    key={index}
                    id={productListing.id}
                    name={productListing.name}
                    price={productListing.price}
                    image={productListing.image}
                    description={productListing.description}
                />
            ))}
        </div>
    );
});
