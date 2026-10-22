
const { test, expect } = require("@playwright/test");
const loginpage = require("../Pages/Loginpage");
const Homepage = require("../Pages/Homepage")
const Productdetailpage = require('../Pages/Productdetailpage')
const Productcartpage = require("../Pages/Productcartpage")
const Shippingdetailpage = require("../Pages/Shippingdetails")
const Bookingsummary = require("../Pages/Bookingsummary")

test("Login Page Test", async function ({ page }) {

    await page.goto("https://evyra-customer.qa.brainvire.net/auth/sign-in");

    const login = new loginpage(page);
    await login.BuyerLogin()
    await expect(page).toHaveURL("https://evyra-customer.qa.brainvire.net/")
    await page.waitForTimeout(3000);

    const homepage = new Homepage(page)
    await homepage.searchfunctionality()
    await page.waitForTimeout(3000);

    const productdetail = new Productdetailpage(page)
    await productdetail.productdetailpage()
    await page.waitForTimeout(3000);

    const cartpage = new Productcartpage(page)
    await cartpage.Productcart()
    await page.waitForTimeout(3000);

    const shippingpage = new Shippingdetailpage(page)
    await shippingpage.Shippingdetail()
    await page.waitForTimeout(3000);
    await shippingpage.Bookingsummarypage()


    const bookinpage = new Bookingsummary(page)
    await bookinpage.Bookingsummarypage()
    await page.waitForTimeout(3000);




});
