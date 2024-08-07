import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
import CountryStateCitySelect from "./components/inputs/CountryStateCitySelect";

const TripsPage = async () => {//its async so well not need use client
  
    const currentUser = await getCurrentUser();

    if (!currentUser) {
    return (
        <ClientOnly>
            <EmptyState 
            title="Unauthorised "
            subtitle="Please login"
            />
        </ClientOnly>
    )
}
const reservations = await getReservations({
    userId: currentUser.id
});

if (reservations.length === 0) {
    return (
        <ClientOnly>
            <EmptyState 
            title="No trips found"
            subtitle="Looks like you haven't reserved any trips"
            />
        </ClientOnly>
    )
}
return (
    <ClientOnly>
        <TripsClient 
        reservations={reservations}
        currentUser={currentUser}
        />
        <CountryStateCitySelect
        
        />
    </ClientOnly>
)
}

export default TripsPage