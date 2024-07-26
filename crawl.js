import { JSDOM } from "jsdom";


const normalizeUrl = (url) => {
    try { new URL(url) } catch (error) { 
        console.log(error);
        return;
    }
    const urlObj = new URL(url);
    let normalizedUrl = urlObj.hostname + urlObj.pathname;
    if (normalizedUrl.slice(-1) === "/") { 
        normalizedUrl = normalizedUrl.slice(0, -1);
    };
    return normalizedUrl;
};


const getURLsFromHTML = (htmlBody, baseURL) => {
    const dom = new JSDOM(htmlBody, { url: baseURL });
    const urls = [];
    dom.window.document.querySelectorAll('a').forEach(link => {
        urls.push(link.href);
    });
    return urls;
};


export { normalizeUrl, getURLsFromHTML };
