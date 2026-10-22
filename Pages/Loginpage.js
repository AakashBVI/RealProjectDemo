class loginpage {

    constructor(page) {
        this.page = page;

        this.Email = "//*[@id='__next']/div[1]/div[2]/main/div/div[1]/div[1]/div[1]/div[2]/input";
        this.password = "//*[@id='__next']/div[1]/div[2]/main/div/div[1]/div[1]/div[2]/div[2]/input";
        this.Loginsubmit = "//*[@id='__next']/div[1]/div[2]/main/div/div[2]/button[1]";
    }

    async BuyerLogin() {
        await this.page.fill(this.Email, "mayank.patel+2121@brainvire.com");
        await this.page.fill(this.password, "Admin@123");
        await this.page.click(this.Loginsubmit);
    }
}

module.exports = loginpage;