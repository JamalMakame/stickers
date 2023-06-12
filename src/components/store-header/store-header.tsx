import { component$ } from "@builder.io/qwik";
import PageTitle from "../page-title/page-title";

export default component$(() => {
    return (
        <div class="">
            <PageTitle text="Get Doggy Stickers!" />
            <p class="max-w-xl text-center px-2 mx-auto text-base text-gray-600">
                Times are tough. Liven up your home with some cute Doggy Stickers. 🐶
            </p>
        </div>
    );
});
