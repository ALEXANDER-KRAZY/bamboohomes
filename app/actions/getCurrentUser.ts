import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        //initiate session
        const session = await getSession();

        //check if the session is correct
        if (!session?.user?.email) {
            return null;
        }
        //lets find the current user
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

    //if there is no current user return null
    if (!currentUser) {
        return null;
    }

    return {
        ...currentUser,
        createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null
    };

    } catch (error: any) {
        return null;
    }
}
