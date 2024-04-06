  import { NextResponse } from "next/server";

  import prisma from "@/app/libs/prismadb";
  import getCurrentUser from "@/app/actions/getCurrentUser";

  //export async function: This line defines a function named POST.
  // The export keyword means that this function can be used outside of the current file.
  // The async keyword means that this function can perform asynchronous operations, such as fetching data from a server or waiting for a user's input.
  export async function POST(
    request: Request, //Request likely refers to an HTTP request object, which contains information about the incoming HTTP request, such as headers, body, and URL.
  ) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();
    const { 
      listingId,
      startDate,
      endDate,
      totalPrice
    } = body;

    //In Prisma, when you want to create a new related record (in this case, a reservation) for a parent record
    // (in this case, a listing), you need to use the connectOrCreate or create nested mutation inside the update() method.

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.error();
    }

    const listingAndReservation = await prisma.reservation.create({
      data: {
            userId: currentUser.id,
            listingId,
            startDate,
            endDate,
            totalPrice,
          },
    });

    return NextResponse.json(listingAndReservation);
  }

  //We first fetch the listing by its ID to ensure it exists.
//If the listing exists, we then create a new reservation using the prisma.reservation.create() method, providing the necessary data.
//Finally, we return the newly created reservation as JSON.
//Make sure to replace currentUser.id with the actual field in your User model that represents the user's ID.
