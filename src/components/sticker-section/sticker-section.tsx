/* eslint-disable qwik/jsx-img */

import { component$, useContext } from "@builder.io/qwik";
import { StickerContext } from "~/routes/sticker/[stickerId]";

export default component$(() => {
    const sticker = useContext(StickerContext);
    return (
        <div class="w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg">
            <div class="relative h-96">
                <img
                    src={sticker.meta.image}
                    alt={sticker.meta.name}
                    class="transform duration-500 ease-in-out hover:scale-105"
                    height={384}
                />
            </div>
        </div>
    );
});
