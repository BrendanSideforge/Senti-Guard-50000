
import { client } from "../index";

export async function getSimilarUsers(
    user_id: string
) {
    
    const userInformation: any = await client.supabase.from('verification_logs').select().in("user_id", [user_id.toString()]);

    if (!userInformation.data || !userInformation.data.length) {
        return null
    }

    const userSelection: any = await client.supabase.from("verification_logs").select();
    let filteredUsers: any = [];
    let foundUsers: any = [];

    const lastIndex: number = userInformation.data.length - 1;
    // console.log(userSelection);

    for (let i = 0; i < userSelection.data.length; i++) {

        const user: object | any = userSelection.data[i];
        // console.log(user.user_id, user_id);
        if (user.user_id !== user_id && !(foundUsers.includes(user.user_id))) {

            console.log(userInformation.data);
            console.log(userInformation.data[lastIndex]);
            if (
                user.cookie == userInformation.data[lastIndex].cookie
                || user.fingerprint == userInformation.data[lastIndex].fingerprint
                || user.ip_address == userInformation.data[lastIndex].ip_address
            ) {
                filteredUsers.push(user);
                foundUsers.push(user.user_id);
            }

        }

    }

    return filteredUsers;

}

export async function checkForSimilarUsers(
    user_id: any,
    ip_address: string,
    fingerprint: string,
    cookie: string
) {

    const similarUsers: any = await client.supabase.from("verification_logs").select();
    let filteredUsers: any = [];
    let foundUsers: any = [];

    for (let i = 0; i < similarUsers.data.length; i++) {

        const user: object | any = similarUsers.data[i];
        if (user.user_id !== user_id && !(foundUsers.includes(user.user_id))) {
            if (
                user.cookie == cookie
                || user.fingerprint == fingerprint
                || user.ip_address == ip_address
            ) {
                filteredUsers.push(user);
                foundUsers.push(user.user_id);
            }

        }

    }

    return filteredUsers;

}
