import axios from 'axios'
import * as cheerio from 'cheerio'
import { extractPrice } from '../utils';
import { Original_Surfer } from 'next/font/google';

export async function scrapeAmazonProduct(url: string){
    if(!url) return;
    // bright data integration

    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_d5f33a50-zone-scapy:i7qibgj76bi9 -k "https://geo.brdtest.com/welcome.txt"
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225
    const session_id = (1000000 * Math.random()) | 0
    const options = {
        auth: {
            username: `${username} - session - ${session_id}`,
            password
        },
        host: `brd.superproxy.io`,
        port,
        rejectUnauthorized: false,
    }
    try {
        // Fetch the product page
        const response = await axios.get(url, options)
        const $ = cheerio.load(response.data)

        const title = $('#productTitle').text().trim()
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base')
        )
        const originalPrice = extractPrice(
            $('#priceblock-outprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listprice'),
            $('#priceblock-dealprice'),
            $('.a-size-base.a-color-price')
        )
        const outOfStock = $('availability span').text().trim().toLocaleLowerCase() === 'currently unavailable'
        const image = $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image')
        console.log({title, currentPrice, originalPrice})
    
    } catch (error:any) {
        throw new Error(`Failed to scrape product ${error.message}`)
    }
}