import { ApifyClient } from 'apify-client';

const site = "https://www.ebay.com";

// Initialize the ApifyClient with API token
const client = new ApifyClient({
    token: 'apify_api_rlj3jw7b67HBFzUVVgX9aGLGuIXTgl4GF8aU',
});

const scrap =  (url, maxItems, callback) => {
    // Prepare actor input
    const input = {
        "startUrls": [
            {
                "url": url
            }
        ],
        "maxItems": maxItems,
        "proxyConfig": {
            "useApifyProxy": true
        }
    };

    (async () => {
        // Run the actor and wait for it to finish
        const run = await client.actor("dtrungtin/ebay-items-scraper").call(input);

        // Fetch and print actor results from the run's dataset (if any)
        console.log('Results from dataset');
        const {items} = await client.dataset(run.defaultDatasetId).listItems();
        callback(items);
    })();
}

const scrapBySeller = (sellerLogin, maxItems, callback) => {
    const url = `${site}/sch/i.html?_fss=1&_saslop=1&_sasl=${sellerLogin}&LH_SpecificSeller=1`;
    scrap(url, maxItems, callback);
}

export default {
    scrap,
    scrapBySeller
}