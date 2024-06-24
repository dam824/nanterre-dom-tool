export async function verifyJwt(token : string, secret:string) {
    try{
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(secret),
            { name : 'HMAC' , hash: 'SHA-256'},
            false,
            ['verify']
        );
        const [headerB64, payloadB64, signatureB64] = token.split('.');
        const signature = Uint8Array.from(atob(signatureB64), c => c.charCodeAt(0));

        const valid = await crypto.subtle.verify(
            'HMAC',
            key,
            signature,
            new TextEncoder().encode(`${headerB64}.${payloadB64}`)
        );

        if(!valid) throw new Error('Invalid token');

        return JSON.parse(atob(payloadB64));
    }catch(error){
        console.error('Invalid token : ', error);
        return null;
    }
}