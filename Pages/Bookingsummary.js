class Bookingsummary {

    constructor(page) {
        this.page = page
        this.quotesubmitbutton = "xpath=//button[normalize-space()='Submit Quote Request']"
        this.bookingsummarytext = "//*[@id='__next']/div[1]/div[5]/div[2]"
        this.popuptxt = "//*[@id=:r6g:]"
    }

  async Bookingsummarypage() {

    const textbooking = this.page.locator(this.bookingsummarytext).first()
    await textbooking.waitFor({ state: 'visible' })
    console.log("Booking summary:", (await textbooking.textContent()).trim())

    // Open the confirmation dialog
    await this.page.getByRole('button', { name: 'Submit Quote Request' }).click()

    // Confirm in the dialog (buttons are "Cancel" and "Submit")
    const dialog = this.page.locator(this.popuptxt).first()
    await dialog.waitFor({ state: 'visible' })
    await dialog.getByRole('button', { name: 'Submit', exact: true }).click()

    // Wait for the dialog to close
    await dialog.waitFor({ state: 'hidden' })

}
}

module.exports = Bookingsummary