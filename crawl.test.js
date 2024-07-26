import { test, expect } from "@jest/globals";
import { normalizeUrl } from "./crawl.js";

const url = "http://testing.com/";
const normalizedUrl = "testing.com";

test("normalizes an url", () => {
    expect(normalizeUrl(url)).toBe(normalizedUrl);
});
