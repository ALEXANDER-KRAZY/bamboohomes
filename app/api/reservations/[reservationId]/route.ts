import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
};

export async function DELETE(
    request: Request,
    { params }: { params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid Id');
    }
    //we want to ensure that the only people who can delete a reservation is
    //either the creater of the listing or user who reserved the listing
    const reservation = await prisma.reservation.deleteMany({
        where: {
            //owner
            id: reservationId,
            //user
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]
        }
    });

    return NextResponse.json(reservation);
}
