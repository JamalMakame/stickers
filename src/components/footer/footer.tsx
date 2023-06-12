import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <footer class="py-4 flex justify-center font-primary items-center">
            Built with 💖 by{" "}
            <Link
                href="https://jamalmakame.vercel.app"
                target="_blank"
                rel="noreferrer"
                class="px-1 font-bold text-palette-primary"
            >
                Jamal Makame
            </Link>
        </footer>
    );
});
