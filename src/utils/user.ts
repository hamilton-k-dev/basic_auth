import { auth } from "@/auth";

export const getUserInfo = async () => {
    const session = await auth();
    const user = session?.user;

    return user;
};
