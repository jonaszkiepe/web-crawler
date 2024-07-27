import { test, expect } from "@jest/globals";
import { sortPages } from "./report.js";

const pages = {
  'wagslane.dev': 2,
  'wagslane.dev/tags': 3,
  'wagslane.dev/tags/clean-code': 1,
  'wagslane.dev/tags/management': 6,
  'wagslane.dev/tags/philosophy': 8,
  'wagslane.dev/tags/writing': 7,
  'wagslane.dev/about': 5,
  'wagslane.dev/index.xml': 4,
}


const sortedPages = [
  ['wagslane.dev/tags/philosophy', 8],
  ['wagslane.dev/tags/writing', 7],
  ['wagslane.dev/tags/management', 6],
  ['wagslane.dev/about', 5],
  ['wagslane.dev/index.xml', 4],
  ['wagslane.dev/tags', 3],
  ['wagslane.dev', 2],
  ['wagslane.dev/tags/clean-code', 1],
]


test("normalizes an url", () => {
    expect(sortPages(pages)).toStrictEqual(sortedPages);
});
