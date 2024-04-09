import getCurrentUser from "../actions/getCurrentUser";
import getFavavoriteListings from "../actions/getFavoriteListings"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {

    //load listings
    const listings =await getFavavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
  return (
    <ClientOnly>
        <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorites home list"
        />
    </ClientOnly>
  )
}

return (
    <ClientOnly>
        <FavoritesClient
        listings={listings}
        currentUser={currentUser}
        />
    </ClientOnly>
)
}
export default FavoritesPage
