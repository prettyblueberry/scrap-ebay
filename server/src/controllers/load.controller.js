import HS from "http-status-codes";
import loadModel from "../models/load.model.js";
import sellerModel from "../models/seller.model.js";
import itemModel from "../models/item.model.js";
import scrapHelper from "../helpers/apify-ebay-scraper.helper.js";
import moment from "moment";
import LoadType from "../constants/load-type.js";
import dbCon from "../models/dbcon.js";

//get
const search = (query, req, res) => {
    loadModel.getWhere(null, query, (qb, err, loads)=>{
        qb.disconnect();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(loads);
    })
}

const maxItems = process.env.SCRAP_ITEM_LIMIT;
let pendingCount = 0;
let pendingError = 0;
const loadSoldItemsByAllSellers = (isSchedule, callback) => {
    sellerModel.getWhere(null, {}, (qb, err, sellers)=>{
        console.log(`scraping-try-all: items of ${sellers.length} sellers`);
        sellers.forEach((s)=>{
            pendingCount ++;
            loadSoldItemsBySeller(s, maxItems, isSchedule, qb,(qb, err)=>{
                pendingCount --;
                if(err) {
                    pendingError ++;
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                }
                if(pendingCount === 0){
                    qb.disconnect();
                    console.log(`scraping-finish-all: items of ${sellers.length} sellers with ${pendingCount} errors`);
                    if(callback)
                        callback();
                }
            });
        });
    })
}

const loadStoreByAllSellers = (isSchedule, callback) => {
    sellerModel.getWhere(null, {}, (qb, err, sellers)=>{
        console.log(`scraping-try-store: items of ${sellers.length} sellers`);
        sellers.forEach((s)=>{
            pendingCount ++;
            loadStoreBySeller(s, maxItems, isSchedule, qb,(qb, err)=>{
                pendingCount --;
                if(err) {
                    pendingError ++;
                    const lastQuery = qb.last_query();
                    console.error(err, lastQuery);
                }
                if(pendingCount === 0){
                    qb.disconnect();
                    console.log(`scraping-finish-all: items of ${sellers.length} sellers with ${pendingCount} errors`);
                    if(callback)
                        callback();
                }
            });
        });
    })
}

const loadSoldItemsBySeller = (s, maxItems, isSchedule, qb, callback) => {
    scrapHelper.scrapSoldItemsBySeller(s.login, maxItems, (err, rawItems, url)=>{
        if(err) {
            console.error(err);
            return false;
        }

        const loadRow = {
            sellerId: s.id,
            srcUrl: url,
            isSchedule: isSchedule === true ? 1 : 0,
            isNew: true,
            loadType: LoadType.ItemsSoldBySeller
        };
        loadModel.inputRow(qb, loadRow, (qb, err, dbLoad) => {
            inputBatchItems(qb, rawItems, dbLoad, callback);
        });
    })
};


const loadStoreBySeller = (qb, sellerLogin, isSchedule, callback) => {
    dbCon(qb).then((qb)=>{
        scrapHelper.scrapAllItemsBySeller(sellerLogin, maxItems, (err, rawItems, url)=>{
            if(err) {
                console.error(err);
                return false;
            }

            const loadRow = {
                sellerId: sellerLogin,
                srcUrl: url,
                isSchedule: isSchedule === true ? 1 : 0,
                isNew: true,
                loadType: LoadType.ItemsAllBySeller
            };
            loadModel.inputRow(qb, loadRow, (qb, err, dbLoad) => {
                inputBatchItems(qb, rawItems, dbLoad, callback);
            });
        })
    });
};

const inputBatchItems = (qb, rawItems, dbLoadRow, callback) => {
    const items = rawItems.map((item) => ({
        loadId: dbLoadRow.id,
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
}

//delete
const deleteOne = (id, req, res) => {
    loadModel.deleteRow(null,id, (qb, err, oldLoad)=>{
        qb.disconnect();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(oldLoad);
    });
}

export default {
    search,
    deleteOne,
    loadSoldItemsByAllSellers,
    loadStoreBySeller,
    loadStoreByAllSellers
}