import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { ProductListingsProps } from "~/lib/types";

export default component$<ProductListingsProps>((props) => {
    return (
        <Link
            href={`/sticker/${props.id}`}
            class="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter"
        >
            <div class="border-b-2 border-palette-lighter relative">
                <img
                    src={props.image}
                    alt={props.name}
                    class="transform duration-500 ease-in-out hover:scale-110"
                    width={288}
                    height={288}
                />
            </div>
            <div class="relative h-48">
                <div class="px-4 pt-4 text-2xl font-semibold font-primary text-palette-primary">
                    {props.name}
                </div>
                <div class="p-4 text-lg font-light text-gray-600 font-primary">
                    {props.description}
                </div>
                <div class="absolute bottom-0 right-0 pt-2 pb-1 pl-8 pr-4 mb-4 text-base font-medium rounded-tl-sm text-palette-dark font-primary bg-palette-lighter triangle">
                    <Price currency="$" num={props.price} numSize="text-lg" />
                </div>
            </div>
        </Link>
    );
});

interface PriceProps {
    currency: string;
    num: number;
    numSize: string;
}

export const Price = component$<PriceProps>(({ currency, num, numSize }) => {
    return (
        <>
            {currency}
            <span class={numSize}>{num}</span>
        </>
    );
});
