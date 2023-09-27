import axios from "axios";
import crypto from "node:crypto";

export default class CryptomusService {
  apiKey;
  merchantId;

  constructor(apiKey, merchantId) {
    this.apiKey = apiKey;
    this.merchantId = merchantId;
  }

  getHeader(payload) {
    const sign = crypto
      .createHash("md5")
      .update(Buffer.from(payload).toString("base64") + this.apiKey)
      .digest("hex");

    return {
      merchant: this.merchantId,
      sign,
    };
  }

  async createPayment(amount, orderId) {
    try {
      const payload = {
        amount: amount.toString(),
        currency: "USDT",
        order_id: orderId,
      };

      const { data } = await axios.post(
        "https://api.cryptomus.com/v1/payment",
        payload,
        {
          headers: this.getHeader(JSON.stringify(payload)),
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async checkPayment(uuid) {
    try {
      const payload = {
        uuid,
      };

      const { data } = await axios.post(
        "https://api.cryptomus.com/v1/payment/info",
        payload,
        {
          headers: this.getHeader(JSON.stringify(payload)),
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
