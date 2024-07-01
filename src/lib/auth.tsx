import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"

export function isAuthenticatedCookies(cookies: RequestCookies) {
    const isLoggedIn = cookies?.get('accessToken')
    return !!isLoggedIn
}

export function getRole(cookies: RequestCookies) {
    const isLoggedIn = cookies?.get('userData');
    if (!isLoggedIn) return '';
    const userData: any = cookies?.get('userData')?.value;
    return JSON.parse(userData).role;
}

export function isAuthenticatedLocalStore() {
    let checkout = typeof window !== 'undefined' ? localStorage?.getItem('persist:auth-yaly-fabric') : null
    return !!checkout
}
