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
        if (link.href !== "/") {
            urls.push(link.href);
        }
    });

    return urls;
};


const getHTML = async(URL) => {

    let res
    try {
        res = await fetch(URL);
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

    return await res.text()
}


const crawlPage = async (baseURL, currentURL = baseURL, pages = {}) => {

    if (!currentURL.includes(baseURL)) {
        return pages;
    };

    const normalizedURL = normalizeUrl(currentURL)
    if (!pages[normalizedURL]) {
        pages[normalizedURL] = 0
    }
    pages[normalizedURL]++

    console.log(`Crawling ${currentURL}`);
    const html = await getHTML(currentURL)

    const foundURLs = getURLsFromHTML(html, baseURL)

    if (!foundURLs) { 
        return pages; 
    };

    for (const url of foundURLs) {
        if (url.includes(currentURL) && url.length > currentURL.length) {
            pages = await crawlPage(baseURL, url, pages)
            console.log(pages)
        }
    }

    return pages

};


export { normalizeUrl, getURLsFromHTML, crawlPage };
