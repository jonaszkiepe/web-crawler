import { argv } from "node:process";
import { crawlPage } from "./crawl.js";

function main() {
    if (argv.length < 3) { 
        console.log("url argument is needed");
        return;
    } else if (argv.length > 3) { 
        console.log("too many arguments");
        return;
    };
    const baseURL = argv[2]
    const pages = crawlPage(baseURL)
    console.log(pages)

}

main()
