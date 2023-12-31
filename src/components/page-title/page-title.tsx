import { component$ } from "@builder.io/qwik";

interface ItemProps {
    text: string;
}

export default component$<ItemProps>((props) => {
    return (
        <h1 class="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
            {props.text}
        </h1>
    );
});
