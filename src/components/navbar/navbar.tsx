import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { useAuthSession, useAuthSignin, useAuthSignout } from "~/routes/plugin@auth";

export default component$(() => {
    const session = useAuthSession();
    const signIn = useAuthSignin();
    const signOut = useAuthSignout();
    const cart = useSignal([]);

    const cartLength = useComputed$(() => cart.value.length);

    return (
        <header class="border-b border-palette-lighter sticky top-0 z-20 bg-white">
            <div class="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
                <Link href="/" class="cursor-pointer">
                    <h1 class="flex no-underline">
                        <img
                            src="/icon.svg"
                            alt="Doggy Stickers"
                            height={32}
                            width={32}
                            class="h-8 w-8 mr-1 object-contain"
                        />
                        <span class="text-xl font-primary font-bold tracking-tight pt-1">
                            Doggy Stickers
                        </span>
                    </h1>
                </Link>
                <div>
                    {session.value?.user ? (
                        <div class="flex justify-between items-center gap-x-5">
                            <Link href="/cart" aria-label="cart" class="relative">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#5b21b6"
                                        d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25c0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2Z"
                                    />
                                </svg>

                                {cartLength.value === 0 ? null : (
                                    <div class="absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-gray-900 transform translate-x-10 -translate-y-3 bg-yellow-300 rounded-full">
                                        {cartLength.value}
                                    </div>
                                )}
                            </Link>
                            <Form action={signOut}>
                                <input type="hidden" name="callbackUrl" value="/" />
                                <button
                                    class="bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
    justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-28  hover:bg-palette-dark rounded-lg"
                                >
                                    Sign Out
                                </button>
                            </Form>
                        </div>
                    ) : (
                        <Form action={signIn}>
                            <input type="hidden" name="providerId" value="github" />
                            <input
                                type="hidden"
                                name="options.callbackUrl"
                                value="http://localhost:5173/"
                            />
                            <button
                                class="bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
    justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-28 hover:bg-palette-dark rounded-lg"
                            >
                                Sign In
                            </button>
                        </Form>
                    )}
                </div>
            </div>
        </header>
    );
});
