import cron from "node-cron";
import CryptomusService from "../crytpomus/cryptomus.service.mjs";

export default class CronService {

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