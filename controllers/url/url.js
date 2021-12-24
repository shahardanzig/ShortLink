// packages needed in this file
const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

// creating express route handler
const router = express.Router()

// import the Url database model
const Url = require('../../schema/url');
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 5000

const baseUrl = `http://${host}:${port}`;

// @description - encode long URL to short url
// @recive - string, long url
// @return - string, short url
router.post('/encode', async (req, res) => {
    const { longUrl } = req.body;

    if (!validUrl.isUri(baseUrl)) {
        res.status(401).json('invalid base url');
    }

    if (validUrl.isUri(longUrl)) {
        try {
            // generate unqiue id for url
            const urlCode = shortid.generate();

            // check if we already encoded this url
            let url = await Url.findOne({
                longUrl
            });

            // if url exist, return the respose
            if (url) {
                res.json(url.shortUrl);
            } else {
                // join the generated short code the the base url
                const shortUrl = `${baseUrl}/${urlCode}`;

                // invoking the Url model and saving to the DB
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode
                });

                await url.save();
                res.json(shortUrl);
            }
        }
        // exception handler
        catch (err) {
            console.log(err)
            res.status(500).json(`error encoding url - ${err}`);
        }
    } else {
        res.status(401).json('Invalid url')
    }
})

// @description - decode short URL to long url
// @recive - string, short url
// @return - string, long url
router.post('/decode', async (req, res) => {
    try {
        const { shortUrl } = req.body;

        // find matching url
        const url = await Url.findOne({
            shortUrl: shortUrl
        })

        if (url) {
            // return long url
            return res.json(url.longUrl);
        } else {
            // else return a not found 404 status
            return res.status(404).json('url was not found')
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

module.exports = router;