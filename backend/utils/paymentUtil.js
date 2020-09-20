const axios = require("axios");
require("dotenv").config();

const { mobiToken, mobiPaymentURL, APP_URL } = process.env;

const config = {
  headers: { Authorization: `Bearer ${mobiToken}` },
};

module.exports = {
  createPayment,
};

async function createPayment(dto) {
  const payload = {
    request_methods: ["WEB"],
    reference_number: dto.orderId,
    shipping_enabled: dto.shippingEnabled,
    email: dto.email,
    merchant_phone_number: null,
    mobile_number: formateContactNo(dto.contactNumber),
    customer_id: "",
    customer_salutation: "",
    customer_first_name: dto.name,
    customer_last_name: "",
    redirect_url: `https://${APP_URL}/?tr=${dto.orderId}`,
    response_url: `https://${dto.apiUrl}/response`,
    cancel_url: `https://${APP_URL}/`,
    fixed_amount: true,
    currency: "ZAR",
    amount: dto.total,
    tax_id: "",
    template_id: "",
    moto_enabled: false,
    shipping_enabled: false,
    send_mms_invoice: false,
    attach_invoice: true,
    invoice_url: "https://mp-fixed-assets.s3.amazonaws.com/logo.png",
    attach_receipt: true,
    receipt_file_type: "pdf",
    payment_type: "DB",
    payment_methods: ["NEDBANK_EFT"],
    expiry_date: "",
    send_confirmation: true,
  };
  const result = await axios.post(`${mobiPaymentURL}`, payload, config);
  if (result && result.status === 200) {
      return result.data;
  }
}

// not the most elegant code but it gets the job done for now -> reformats the contact number mask
// comes through as (123) 123 - 123
function formateContactNo(contactNo) {
  let noWhiteSpaces = contactNo.replace(/\s/g, "");
  let noleftBrackets = noWhiteSpaces.replace("(", "");
  let norightBrackets = noleftBrackets.replace(")", "");
  let noBrackets = norightBrackets.replace("-", "");
  let formatedContactNo = "+27" + noBrackets.slice(1, noBrackets.length);
  return formatedContactNo;
}

