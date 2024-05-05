import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings(){
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];//empty array because there are no listings to load
        }
        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });
        //sanitise our favorites
        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }));

        return safeFavorites;
    } catch (error: any) {
        throw new Error(error);
    }
}