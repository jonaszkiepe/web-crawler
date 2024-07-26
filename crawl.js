import { JSDOM } from "jsdom";


const normalizeUrl = (url) => {
    let urlObj

    try { 
        urlObj = new URL(url) 
    } catch (error) { 
        console.log(`Got url error: ${error}`);
        return;
    }

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


const crawlPage = async (baseURL) => {
    console.log(`Crawling ${baseURL}`)

    let res
    try {
        res = await fetch(baseURL);
    } catch(err) { 
        throw new Error(`Got network error: ${err.message}`)
    };

    if (res.status > 399) {
        console.log(`Got HTTP error: ${res.status}, ${res.text}`);
        return;
    };

    if (!res.headers.get("content-type").includes("text/html")) {
        console.log("Content is not HTML");
        return;
    };

    console.log(await res.text());
};


export { normalizeUrl, getURLsFromHTML, crawlPage };
