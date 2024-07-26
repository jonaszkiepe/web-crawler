import { test, expect } from "@jest/globals";
import { normalizeUrl, getURLsFromHTML } from "./crawl.js";

const url = "http://testing.com/";
const normalizedUrl = "testing.com";
const htmlBody = '<a href="https://boot.dev">Learn Backend Development</a> <a href="/darwin">Learn Backend Development</a> ';
const baseURL = "https://boot.dev";
const result = ["https://boot.dev/"];

test("normalizes an url", () => {
    expect(normalizeUrl(url)).toBe(normalizedUrl);
});
    
test("fishes urls", () => {
    expect(getURLsFromHTML(htmlBody, baseURL)).toStrictEqual(result);
});
