function normalizeUrl(url) {
    try { 
        new URL(url)
    } catch (error) { 
        console.log(error)
        return
    }
    const urlObj = new URL(url)
    let normalizedUrl = urlObj.hostname
    if (urlObj.pathname !== "/") { normalizedUrl += urlObj.pathname }
    return normalizedUrl
};

export { normalizeUrl };
