
import { cyrb53 } from "./helpers/Hashing";
// @ts-ignore
import cookie from 'cookie';

export const handle = async ({ event, resolve }: any) => {

    const clientIP: any = event.getClientAddress();
    const hashed_IP = cyrb53(clientIP);

	const response = await resolve(event);

    response.headers.set(
        'set-cookie',
        cookie.serialize('hashed_ip_address', hashed_IP, {})
    );

    return response;
};