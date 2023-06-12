import { ProductListingsProps } from "./types";


export const productListings = {
    title: "Stickers",
    meta: [
        {
            id: "1",
            name: "The Unicorn",
            price: 9.99,
            image: "/mock-images/unicorn.jpg",
            description: "They exist!",
        },
        {
            id: "2",
            name: "The Fashionista",
            price: 9.99,
            image: "/mock-images/fashionista.jpg",
            description: "You know he's got his own personal stylist",
        },
        {
            id: "3",
            name: "The Drooler",
            price: 9.99,
            image: "/mock-images/drooler.jpg",
            description: "Look at that crazy and cute face!",
        },
        {
            id: "4",
            name: "The Player",
            price: 9.99,
            image: "/mock-images/player.jpg",
            description: "Catch this sticke today!",
        },
        {
            id: "5",
            name: "Scaredy Dog",
            price: 9.99,
            image: "/mock-images/scaredy-dog.jpg",
            description: "No surprise courage and him are best friends.",
        },
        {
            id: "6",
            name: "The Pee-er",
            price: 9.99,
            image: "/mock-images/pee-er.jpg",
            description: "He's a little excited to see you.",
        },
        {
            id: "7",
            name: "The Brawl",
            price: 9.99,
            image: "/mock-images/brawl.jpg",
            description: "Let's just say a lot of bones were broken...and chewed on.",
        },
        {
            id: "8",
            name: "Tip Toe Pub",
            price: 9.99,
            image: "/mock-images/pup.jpg",
            description: "So sneaky, so cute!",
        },
        {
            id: "9",
            name: "Dog Bath",
            price: 9.99,
            image: "/mock-images/dog-bath.jpg",
            description: "He's not a fan of baths.",
        },
        {
            id: "10",
            name: "Tongue Wagger",
            price: 9.99,
            image: "/mock-images/wagger.jpg",
            description: "Tis a slobby one!",
        },
        {
            id: "11",
            name: "Angry Dog",
            price: 9.99,
            image: "/mock-images/angry-dog.jpg",
            description: "Isn't he cute when he's angry?",
        },
    ] satisfies ProductListingsProps[],
} satisfies {
    title: string;
    meta: ProductListingsProps[];
};