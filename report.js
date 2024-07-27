
const sortPages = (pages) => {

    const pagesArr = []
    Object.keys(pages).forEach((i) => {
        pagesArr.push([i, pages[i]])
    });

    for (let i = 1; i < pagesArr.length; i++) {

        const first = pagesArr[i - 1]
        const second =  pagesArr[i]

        if (first[1] < second[1]) {
            pagesArr[i] = first
            pagesArr[i - 1] = second
            i = 0
        }
    }

    return pagesArr
}

const printReport = (pages) => {
    console.log("Starting report...")
    const sortedPages = sortPages(pages)
    for (const page of sortedPages) {
        if (page[1] !== 1) {
            console.log(`The link ${page[0]} was found ${page[1]} times.`)
        } else {
            console.log(`The link ${page[0]} was found ${page[1]} time.`)
        }
    }
}

export { sortPages, printReport }
