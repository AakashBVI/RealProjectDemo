class Productcartpage {

    constructor(page) {
        this.page = page
        this.proceedbutton = "//*[@id='__next']/div[1]/div[3]/div/div[3]/div/button"
        this.shippingaddress = "//*[@id='__next']/div[1]/div[3]/div/div[5]/div/p"
    }

    async Productcart() {
        const shippingdetail = await this.page.locator(this.shippingaddress)
        if (await shippingdetail.isVisible()) {
            await this.page.locator(this.proceedbutton).click()
      } }
}
module.exports=Productcartpage;