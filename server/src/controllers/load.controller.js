import HS from "http-status-codes";
import loadModel from "../models/load.model.js";
import sellerModel from "../models/seller.model.js";
import itemModel from "../models/item.model.js";
import scrapHelper from "../helpers/apify-ebay-scraper.helper.js";
import moment from "moment";

//get
const search = (query, req, res) => {
    loadModel.getWhere(query, (qb, err, loads)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(loads);
    })
}

const maxItems = process.env.SCRAP_ITEM_LIMIT;
let pendingCount = 0;
let pendingError = 0;
const loadAllSellers = (isSchedule, callback) => {
    sellerModel.getWhere({}, (qb, err, sellers)=>{
        console.log(`scraping-try-all: items of ${sellers.length} sellers`);
        sellers.forEach((s)=>{
            pendingCount ++;
            loadOneSeller(s, maxItems, isSchedule, (qb, err)=>{
                qb.release();
                pendingCount --;
                if(err) {
                    pendingError ++;
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                }
                if(pendingCount === 0){
                    console.log(`scraping-finish-all: items of ${sellers.length} sellers with ${pendingCount} errors`);
                    if(callback) callback();
                }
            });
        });
    })
}

const loadOneSeller = (s, maxItems, isSchedule, callback) => {
    scrapHelper.scrapBySeller(s.login, maxItems, (rawItems, url)=>{
        const loadRow = {
            sellerId: s.id,
            srcUrl: url,
            isSchedule: isSchedule === true ? 1 : 0,
            isNew: true
        };
        loadModel.inputRow(loadRow, (qb, err, dbLoad) => {
            const items = rawItems.map((item) => ({
                loadId: dbLoad.id,
                itemNumber: item.itemNumber,
                title: item.title,
                url: item.url,
                categories: JSON.stringify(item.categories),
                subTitle: item.subTitle,
                endedDate: moment(new Date(item.endedDate)).format("YYYY-MM-DD HH:mm:ss"),
                price: item.price,
                priceWithCurrency: item.priceWithCurrency,
                wasPrice: item.wasPrice,
                wasPriceWithCurrency: item.wasPriceWithCurrency,
                available: item.available,
                availableText: item.availableText,
                sold: item.sold,
                image: item.image,
                images: JSON.stringify(item.images),
                seller: item.seller,
                itemLocation: item.itemLocation,
                ean: item.ean,
                mpn: item.mpn,
                upc: item.upc,
                brand: item.brand,
                type: item.type,
                datetimeCreated: moment(new Date(Date.now())).format("YYYY-MM-DD HH:mm:ss"),
                condition: item.condition,
                datetimeUpdated: item.lastUpdated ? moment(new Date(item.lastUpdated)).format("YYYY-MM-DD HH:mm:ss"): null,
            }));
            itemModel.insertBatch(qb, items, callback)
        });
    })
};

//delete
const deleteOne = (id, req, res) => {
    loadModel.deleteRow(id,(qb, err, oldLoad)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(oldLoad);
    });
}

export default {
    search,
    deleteOne,
    loadOneSeller,
    loadAllSellers
}