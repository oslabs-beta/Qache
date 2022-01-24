const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/ProductModel.js');
const resolvers = require('../resolvers/resolvers.js');

// router sends user to given "section" under products heading on sidebar -- e.g. Furniture, Mattresses, Kitchenware, etc.
// should read the section from the req.params, and use that in its database request and display the associated data
// will also cache the fetched data using QachenGo for faster fetching if request is made again
router.get('/:section', async (req, res) => {
    const section = req.params.section;
    // resolvers.getProductsBy()
    // will send request to mongoose database to find all relevant furniture/other items and display on web page
    // e.g., if user clicks on the 'Mattresses' tab under the 'Products' header, this sends a request to the '/products/mattresses' route
    // will use the known route 'products' and the const section, which in this case will have the value 'mattresses', both will be passed into the Mongo query
    // will use the productController middleware functions to send these queries, will also need to take a closer look at the resolvers once we merge our different versions
    // so I know how exactly to format these queries for mongoose and/or graphql
    // will probably do that formatting in stages: set up mongoose requests so that they work properly, then adjust it to formatting for graphql, then will integrate Qachengo
    // unless there's a more efficient way, I think that's probably the best so I completely understand how each piece of tech is interacting with each other

    // will also set a timer here to record the amount of time the query takes (maybe record Date.now() before the query, and again after the data is returned?) and send that
    // to the frontend along with the retrieved data so it can be plotted in the line graph

    // there'll be overlap between what shows up in the different sections depending on an item's characteristics, e.g. a bed could fall under both 'mattresses' and 'furniture'
    // which will make a good example for caching benefits - after first querying 'mattresses' and then going to 'furniture', some items will have already been cached,
    // so they will be retrieved from local memory while the rest will be retrieved from the database, cutting down on the querying time
})

module.exports = router;