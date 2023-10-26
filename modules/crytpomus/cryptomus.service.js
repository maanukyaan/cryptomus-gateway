const crypto = require("crypto");

module.exports = class CryptomusService {
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
        amount: amount,
        currency: "USDT",
        order_id: orderId,
      };

      const headers = this.getHeader(JSON.stringify(payload));

      const response = await fetch("https://api.cryptomus.com/v1/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          ...headers,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        // Return data to the client
        return data;
      } else {
        // Handle error here
        console.error("Request failed:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async checkPayment(uuid) {
    try {
      const payload = {
        uuid,
      };

      const headers = this.getHeader(JSON.stringify(payload));

      const response = await fetch(
        "https://api.cryptomus.com/v1/payment/info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Return data to the client
        return data;
      } else {
        // Handle error here
        console.error("Request failed:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
