export function setGetParam(key,value) {
    if (history.pushState) {
        const params = new URLSearchParams(window.location.search);
        params.set(key, value);
        const newUrl = window.location.origin
            + window.location.pathname
            + '?' + params.toString();
        window.history.pushState({path:newUrl},'',newUrl);
    }
}
