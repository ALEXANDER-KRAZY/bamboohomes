import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
  }
  
  const getListings = async (params: IListingsParams = {}) => {
    const { userId } = params;
    const query = userId ? { userId } : {};
    const listings = await prisma.listing.findMany({
      where: query,
    });
  
    return listings;
  };
  
  export default getListings;
