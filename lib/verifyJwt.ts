export async function verifyJwt(token: string, secret: string) {
    try {
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['verify']
        );

        // Découpe le token en ses 3 parties
        const [headerB64, payloadB64, signatureB64] = token.split('.');
        if (!headerB64 || !payloadB64 || !signatureB64) {
            throw new Error('Invalid token format');
        }

        // Décodage Base64URL vers Base64
        const base64UrlDecode = (input: string) =>
            atob(input.replace(/-/g, '+').replace(/_/g, '/'));

        const signature = Uint8Array.from(
            base64UrlDecode(signatureB64),
            (c) => c.charCodeAt(0)
        );

        const valid = await crypto.subtle.verify(
            'HMAC',
            key,
            signature,
            encoder.encode(`${headerB64}.${payloadB64}`)
        );

        if (!valid) throw new Error('Invalid token');

        // Retourne le payload décodé
        return JSON.parse(base64UrlDecode(payloadB64));
    } catch (error) {
        console.error('Invalid token : ', error);
        return null;
    }
}
