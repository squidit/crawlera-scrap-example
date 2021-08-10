import * as dotenv from  'dotenv'
dotenv.config({ silent: true })

import ProxyingAgent from 'proxying-agent'
import decompressResponse from 'decompress-response'
import got from 'got'
import HTMLUtil from './HTMLUtil.js'




try {
    //  URL to scrap
    const URL_SCRAPE = 'https://www.instagram.com/reel/CRpau3TFeSI'
    const proxyURL = `http://${process.env.CRAWLERA_TOKEN}:@squid.crawlera.com:8010`

    // Create options of request
    const options = {
      headers: {
        'X-Crawlera-Cookies': 'disable',
        'X-Crawlera-Profile': 'desktop',
        'X-Crawlera-Profile-Pass': 'User-Agent',
        'accept-encoding': 'gzip, deflate, br',
        'upgrade-insecure-requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
      },
      agent: ProxyingAgent.create(proxyURL, URL_SCRAPE)
    }

    // Create instance of got
    const response = await got(URL_SCRAPE, options)
    const htmlContent = decompressResponse(response)
    
    // From HTML find json data
    const htmlUtil = new HTMLUtil()
    const media = htmlUtil.getMedia(htmlContent.body)
    console.log(media)
  } catch (err) {
    console.error(err)
  }

