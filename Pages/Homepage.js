class Homepage {

    constructor(page) {

        this.page = page
        this.search = "//*[@id='__next']/div[1]/div/div/header/div/div[2]/div[1]/div/div/div[2]/input"
        this.getallsearch = "xpath=//li[contains(@class,'GlobalSearch-style__StyledListItem')]"

        // Menu Items
        this.menuicon = "//*[@id='__next']/div[1]/div/div/header/div/div[2]/div[2]/button"
        this.switchtoseller = "//*[@id='menu-appbar']/div[3]/ul/div/li[1]"
        this.user = "//*[@id='menu-appbar']/div[3]/ul/div/li[2]"
        this.orders = "//*[@id='menu-appbar']/div[3]/ul/div/li[3]"
        this.address = "//*[@id='menu-appbar']/div[3]/ul/div/li[4]"
        this.quoterequests = "//*[@id='menu-appbar']/div[3]/ul/div/li[5]"
        this.savedsearches = "//*[@id='menu-appbar']/div[3]/ul/div/li[6]"
        this.logout = "//*[@id='menu-appbar']/div[3]/ul/div/li[7]"

    }

    async searchfunctionality() {

        await this.page.locator(this.search).pressSequentially("Sky", { delay: 100 })
        const items = this.page.locator(this.getallsearch)

        // wait for the dropdown, then let the list settle
        await items.first().waitFor({ state: 'visible' })
        await this.page.waitForTimeout(1000)
        const count = await items.count()

        for (let i = 0; i < count; i++) {
            const gettext = await items.nth(i).textContent()
            if (gettext.includes('SKYLAR')) {
                await items.nth(i).click()
                console.log("Clicked:", gettext)
                break
            }
        }
    }
}
module.exports = Homepage;