'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import PropertiesClient from "./PropertiesClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings, { IListingsParams } from "@/app/actions/getListings";

const PropertiesPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [listings, setListings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);

      if (user) {
        const userListing = await getListings({ userId: user.id });
        setListings(userListing);
      }
    };

    fetchData();
  }, []);

  const handleHostClick = () => {
    router.push('/host'); // Replace '/host' with the actual path to your host a home page
  };

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="You have no properties of your own. Try hosting a home."
        />
        <div
          onClick={handleHostClick}
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        >
          Click here
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}

export default PropertiesPage;
