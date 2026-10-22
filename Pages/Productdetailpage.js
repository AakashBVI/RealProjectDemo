class Productdetailpage {

    constructor(page) {
        this.page = page;

        this.itemcount = "//*[@id='__next']/div[1]/main/div[1]/div[2]/div[4]/div[1]/div/input"
        this.addbutton = "//*[@id='__next']/div[1]/main/div[1]/div[2]/div[4]/button"
        this.instock = "//*[@id='__next']/div[1]/main/div[1]/div[2]/div[2]/p[1]"
    }

    async productdetailpage() {
        const checkinstockstatus = (await this.page.locator(this.instock).textContent()).trim()
        console.log(checkinstockstatus)

        if (checkinstockstatus === "In Stock") {
            await this.page.locator(this.itemcount).fill("300")
            await this.page.locator(this.addbutton).click();
        }
        else {
            throw new Error("Test Case Failed: status is " + checkinstockstatus)
        }
    }
}
module.exports = Productdetailpage;