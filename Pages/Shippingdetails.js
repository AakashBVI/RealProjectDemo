class Shippingdetailpage {

    constructor(page) {
        this.page = page

        // Shipping detail page
        this.portofdestination = "//*[@id='__next']/div[1]/div[4]/div/div[3]/div[2]/div/div[1]/div[1]/div"
        this.incotermsdropdown = "//*[@id='__next']/div[1]/div[4]/div/div[3]/div[3]/div/div[7]/div/div[2]"
        this.alloptions = "xpath=//li[@role='option']"
        this.getquotebutton = "//*[@id='__next']/div[1]/div[4]/div/div[4]/button"
        this.allbutton = "//*[@id='__next']/div[1]/div[4]/div/div[5]/div[2]/button[1]"
        this.selectbutton = "//*[@id='__next']/div[1]/div[4]/div/div[5]/div[3]/div[1]/div[2]/div[1]/div[2]/div[3]/button"
        this.submitquote = "//*[@id='__next']/div[1]/div[5]/div[2]/div[2]/div/button"

        // Booking summary page
      
    }

    async Shippingdetail() {

        const options = this.page.locator(this.alloptions)

        // Step 1: read the port names (open, read, close)
        await this.page.locator(this.portofdestination).click()
        await options.first().waitFor({ state: 'visible' })
        const portNames = await options.allTextContents()
        await this.page.keyboard.press('Escape')
        console.log("Ports:", portNames)

        // Step 2: read the incoterm names (open, read, close)
        await this.page.locator(this.incotermsdropdown).click()
        await options.first().waitFor({ state: 'visible' })
        const incoNames = await options.allTextContents()
        await this.page.keyboard.press('Escape')
        console.log("Incoterms:", incoNames)

        // Step 3: OUTER loop = incoterm, INNER loop = port
        let quoteSelected = false

        combinations:
        for (let j = 0; j < incoNames.length; j++) {

            for (let i = 0; i < portNames.length; i++) {

                // select i-th port
                await this.page.locator(this.portofdestination).click()
                await options.first().waitFor({ state: 'visible' })
                await options.nth(i).click()

                // select j-th incoterm
                await this.page.locator(this.incotermsdropdown).click()
                await options.first().waitFor({ state: 'visible' })
                await options.nth(j).click()

                console.log(`Port: ${portNames[i].trim()} | Incoterm: ${incoNames[j].trim()}`)

                // get quote
                await this.page.locator(this.getquotebutton).click()

                // if the select button exists, click it and stop searching
                const select = this.page.locator(this.selectbutton)
                const selectExists = await select.waitFor({ state: 'visible', timeout: 5000 })
                    .then(() => true)
                    .catch(() => false)

                if (selectExists) {
                    await select.click()
                    quoteSelected = true
                    break combinations   // exits BOTH loops
                }

                console.log("No select button for this combination")
                await this.page.waitForTimeout(3000)
            }
        }

        if (!quoteSelected) {
            throw new Error("No port/incoterm combination returned a quote")
        }

        // Step 4: move on to the booking summary
        await this.Bookingsummarypage()
    }

    
}

module.exports = Shippingdetailpage