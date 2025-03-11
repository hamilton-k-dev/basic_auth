import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    } catch (error) {
        console.log("ERROR_ON_GETUSERBYID :", error)
        return null;
    }
};
export const getUserByUsername = async (username: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                username,
            },
        });
        return user;
    } catch (error) {
        console.log("ERROR_ON_GETUSERBYUSERNAME :", error)
        return null;
    }
};