import { component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { cartContext } from "~/lib/store";
import { Price } from "../sticker-card/sticker-card";
import { getCartSubTotal } from "~/lib/helpers";

export default component$(() => {
    const cartItems = useContext(cartContext);
    const subtotal = getCartSubTotal(cartItems);
    return (
        <>
            <div class="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
                <table class="mx-auto">
                    <thead>
                        <tr class="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
                            <th class="font-primary font-normal px-6 py-4">Product</th>
                            <th class="font-primary font-normal px-6 py-4">Quantity</th>
                            <th class="font-primary font-normal px-6 py-4 hidden sm:table-cell">
                                Price
                            </th>
                            <th class="font-primary font-normal px-6 py-4">Remove</th>
                        </tr>
                    </thead>
                    <tbody class="divide-palette-lighter">
                        {cartItems.map((item) => (
                            <tr
                                key={item.stickerId}
                                class="text-sm sm:text-base text-gray-600 text-center"
                            >
                                <td class="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                                    <img
                                        src={item.stickerImage}
                                        alt={item.stickerName}
                                        height={64}
                                        width={64}
                                        class={`hidden sm:inline-flex`}
                                    />
                                    <Link
                                        class="pt-1 hover:text-palette-dark"
                                        href={`/sticker/${item.stickerId}`}
                                    >
                                        {item.stickerName}, {item.stickerSize}{" "}
                                    </Link>
                                </td>
                                <td class="font-primary font-medium px-4 sm:px-6 py-4">
                                    {item.quantity}
                                </td>
                                <td class="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                                    <Price
                                        currency="$"
                                        num={item.stickerPrice}
                                        numSize="text-lg"
                                    />
                                </td>
                                <td class="font-primary font-medium px-4 sm:px-6 py-4">
                                    <button aria-label="delete-item" class="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter"
                                            viewBox="0 0 26 26"
                                        >
                                            <g fill="#5b21b6">
                                                <path
                                                    d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14S7.373 2 14 2s12 5.373 12 12Z"
                                                    opacity=".2"
                                                />
                                                <path d="M9.854 16.854a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708.708l-7 7Z" />
                                                <path d="M9.146 9.854a.5.5 0 1 1 .708-.708l7 7a.5.5 0 0 1-.708.708l-7-7Z" />
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M13 24.5c6.351 0 11.5-5.149 11.5-11.5S19.351 1.5 13 1.5S1.5 6.649 1.5 13S6.649 24.5 13 24.5Zm0 1c6.904 0 12.5-5.596 12.5-12.5S19.904.5 13 .5S.5 6.096.5 13S6.096 25.5 13 25.5Z"
                                                    clip-rule="evenodd"
                                                />
                                            </g>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {subtotal === 0 ? null : (
                            <tr class="text-center">
                                <td></td>
                                <td class="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                                    Subtotal
                                </td>
                                <td class="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                                    <Price currency="$" num={subtotal} numSize="text-xl" />
                                </td>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
});
