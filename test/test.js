const express = require('express');
const request = require('supertest');

const app = express();

describe('encode', () => {
    it('should return a short url from the long one', () => {
        const longUrl = "https://www.walla.co.il/";
        const shortUrl = "http://localhost:3000/KJMo5NjSD";

        request(app)
            .post('/encode')
            .send({ longUrl })
            .expect(200)
            .then((res) => {
                expect(res).to.be.eql(shortUrl);
            });
    });
});

describe('decode', () => {
    it('should return the long url from the short one', () => {
        const longUrl = "https://www.walla.co.il/";
        const shortUrl = "http://localhost:3000/KJMo5NjSD";

        request(app)
            .post('/decode')
            .send({ shortUrl })
            .expect(200)
            .then((res) => {
                expect(res).to.be.eql(longUrl);
            });
    });
});
