import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";

export function getUserFromCookie():  {id : string} | null {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if(!token) return null;

    try{
        const decoded = jwt.verify(token, process.env.JTW_SECRET!) as {id : string};
        return decoded;
    }catch(err){
        console.error('JWT verification failde:', err);
        return null;
    }
}