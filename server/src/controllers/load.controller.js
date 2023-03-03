import HS from "http-status-codes";
import loadModel from "../models/load.model.js";
import sellerModel from "../models/seller.model.js";
import itemModel from "../models/item.model.js";
import scrapHelper from "../helpers/apify-ebay-scraper.helper.js";

//get
const search = (query, req, res) => {
    loadModel.getWhere(query, (qb, err, sellers)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(sellers);
    })
}

const loadAllSellers = () => {
    sellerModel.getWhere({}, (qb, err, sellers)=>{
        sellers.forEach((s, i)=>{
            scrapHelper.scrapBySeller(s.login, 10, (items)=>{

            })
        });
    })
}

const loadOneSeller = (s, callback) => {
    scrapHelper.scrapBySeller(s.login, 10, (rawItems, url)=>{
        loadModel.inputRow({sellerId: s.id, srcUrl: url, isNew: true}, (qb, err, dbLoad) => {
            const items = rawItems.map((item) => ({
                loadId: dbLoad.id,
                itemNumber: item.itemNumber,
                title: item.title,
                url: item.url,
                categories: JSON.stringify(item.categories),
                subTitle: item.subTitle,
                endedDate: item.endedDate,
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
                datetimeCreated: new Date().toISOString()
            }));
            itemModel.insertBatch(qb, items, callback)
        });
    })
};

//patch
const saveOne = (body, req, res) => {
    delete body["no"];
    loadModel.inputRow(body, (qb, err, seller)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(seller);
    })
}

//delete
const deleteOne = (id, req, res) => {
    loadModel.deleteRow(id,(qb, err, oldSeller)=>{
        qb.release();
        if(err) return res.sendStatus(HS.INTERNAL_SERVER_ERROR);
        res.json(oldSeller);
    });
}

export default {
    search,
    deleteOne,
    saveOne,
    loadOneSeller
}