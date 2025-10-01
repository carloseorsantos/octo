import { useSession, signIn, signOut } from "next-auth/react";

export const useNavUser = () => {
    const { data: session } = useSession();

    return {
        user: session?.user,
        isLoggedIn: !!session,
        signIn,
        signOut,
    }
}