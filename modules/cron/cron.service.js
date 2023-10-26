const cron = require("node-cron");
const CryptomusService = require("../crytpomus/cryptomus.service.js");

module.exports = class CronService {

    constructor() {
        CryptomusService
    }

    async init() {
        cron.schedule("*/5 * * * * *", async () => {
            const res = await this.CryptomusService.checkPayment(payment.uuid);

            if (!res) {
                console.log("Error in cron service");
            }

            if (res.result.is_final) {
                console.log("Payment succesfully!")
            }

        })
    }
}