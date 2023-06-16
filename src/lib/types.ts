export interface ProductListingsProps {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export interface CartItem{
    stickerName:string;
    stickerImage: string;
    stickerId: string;
    stickerPrice: number;
    quantity:number;
    stickerSize:string;
    userId:string;
}