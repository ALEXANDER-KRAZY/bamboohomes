"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservations, SafeUser } from "../types"
import { useState } from "react";

interface TripsClientProps {
    currentUser?: SafeUser | null;
    reservations: SafeReservations[];
}

const TripsClient: React.FC<TripsClientProps> = ({
    currentUser,
    reservations
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    
  return (
    <Container>
        <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
        />
        <div
        className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid:cols-4
        xl:grid-cols-5
        2xl:grid-cols6
        gap-8
        "
        >
            Trips!
        </div>
    </Container>
  )
}

export default TripsClient
