'use client';

import { safeListings, SafeReservations, SafeUser } from "@/app/types";

import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import Image from 'next/image';
import { format } from 'date-fns';
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data: safeListings;
    reservation?: SafeReservations;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
const router = useRouter();
const {  getByValue } = useCountries();

const location = getByValue(data.locationValue);

//handleCancel only used in reservations
const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); //stops the button fro re deleting over and over again

        if (disabled) {
            return;
        }
        onAction?.(actionId);
    }, [onAction, actionId, disabled]);

const price = useMemo(() => {
    if (reservation) {
        return reservation.totalPrice;
    }
    return data.price;
}, [data.price, reservation]);

//dates only works for reservations
const reservationDate = useMemo(() => {
    if (!reservation) {
        return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    // return a date fns function
    return `${format(start, 'PP')} - ${format(end, 'PP')}`
}, [reservation]);
  return (
    <div
    onClick={() => router.push(`/listings/${data.id}`)}
    className="
    col-span-1 cursor-pointer group
    ">
        <div className="flex flex-col gap-2 w-full">
            <div className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
            ">
                <Image 
                alt="listing"
                fill
                src={data.imageSrc}
                className="
                object-cover
                h-full
                w-full
                group-hover:scale-110
                transition
                "
                />
                {/*like emoji*/}
                <div className="absolute top-3 right-3">
                    <HeartButton 
                    listingId={data.id}
                    currentUser={currentUser}
                    />
                </div>
            </div>
            {/*show details about a listing i.e name,location,price etc*/}
            <div className="font-semibold text-lg">
                {location?.region}, {location?.label}
            </div>
            <div className="font-light text-neutral-500">
                {reservationDate || data.category}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                    $ {price}
                </div>
                {!reservation && (
                    <div className="font-light">Per night</div>
                )}
            </div>
            {/*works with reservation*/}
            {onAction && actionLabel && (
                <Button 
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
                />
            )}
        </div>
    </div>
  );
}

export default ListingCard
