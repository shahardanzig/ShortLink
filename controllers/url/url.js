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

// @description - create short URL from long url
// @return - short url
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

module.exports = router;