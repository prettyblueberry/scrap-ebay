import { ApifyClient } from 'apify-client';

const site = "https://www.ebay.com";

// Initialize the ApifyClient with API token
const client = new ApifyClient({
    token: process.env.API_KEY,
});

const scrapItems =  (url, maxItems, callback) => {
    // Prepare actor input
    const input = {
        "startUrls": [
            {
                "url": url
            }
        ],
        "maxItems": maxItems * 1,
        "proxyConfig": {
            "useApifyProxy": true
        }
    };

    (async () => {
        try{
            const run = await client.actor("dtrungtin/ebay-items-scraper").call(input);

            // Fetch and print actor results from the run's dataset (if any)
            const {items} = await client.dataset(run.defaultDatasetId).listItems();
            // Run the actor and wait for it to finish
            callback(null, items, url);
        } catch(err) {
            callback(err, [], url)
        }
    })();
}

const scrapItemsBySeller = (sellerLogin, getUrlFn, maxItems, callback) => {
    const url = getUrlFn(sellerLogin);
    console.log(`scraping-try: items of seller '${sellerLogin}' from url '${url}'`);
    scrapItems(url, maxItems, (items, url) => {
        console.log(`scraping-finish: ${items.length} items of seller '${sellerLogin}'`);
        callback(items, url)
    });
}

const scrapSoldItemsBySeller = (sellerLogin, maxItems, callback) => {
    const getUrlFn = (sellerLogin) => {
        return`${site}/sch/i.html?_nkw=&_armrs=1&_ipg=&_from=&_ssn=${sellerLogin}&_sop=10&LH_Sold=1&LH_Complete=1`;
    };
    return scrapItemsBySeller(sellerLogin, getUrlFn, maxItems, callback)
}

const scrapAllItemsBySeller = (sellerLogin, maxItems, callback) => {
    const getUrlFn = (sellerLogin)=>{
        return`${site}/sch/i.html?_nkw=&_armrs=1&_ipg=&_from=&_ssn=${sellerLogin}&_sop=10`;
    };
    return scrapItemsBySeller(sellerLogin, getUrlFn, maxItems, callback)
}


export default {
    scrapAllItemsBySeller,
    scrapSoldItemsBySeller
}