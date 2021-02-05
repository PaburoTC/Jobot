export function setCookie(key, value, ttl) {
    const d = new Date();
    d.setTime(d.getTime() + (ttl * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = key.trim() + '='+ value + ';'+ expires + ';path=/';
}


export function getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.trim().indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
