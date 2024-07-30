// var Constants={}
// const getConstants=async()=>{
//     var response={}
//     try {
//       response= await fetch('/api/products/constants')
//     } catch (error) {
//       console.log("Error fetching Constants: ",error)
//     }
//     return await response.json()
//   }
// // const fetchConstants=async()=>{
// //   Constants= await getConstants()
// // }
// getConstants().then(constants=>{
//   console.log(constants)
//   Constants=constants})

// console.log(Constants)
// export const categories=Constants[0].categories
export const categories = ['electronics', "men's clothing", "women's clothing", "jewelery",]
export const prices = ['All', '0-100', '100-200', '200-400', '400-800', '800-1600', '1600-5000']
export const currency = '$'
export const websiteName = 'E commerce'

const currentDate = new Date();
export const formattedDate = currentDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });

export const getDispatchObject = (product,quantity) => {
  const dispatchObject = {
    "_id": product._id,
    "title": product.title,
    "image": product.image,
    "price": product.price,
    "date": formattedDate,
    "quantity": quantity
  }
  return dispatchObject;
}
export const formData = {
  "billingInformation": {
    "label": "Billing Information",
    "fields": [
      {
        "type": "text",
        "name": "fullName",
        "label": "Full Name",
        "required": true
      },
      {
        "type": "email",
        "name": "email",
        "label": "Email Address",
        "required": true
      },
      {
        "type": "tel",
        "name": "phone",
        "label": "Phone Number",
        "required": true
      },
      {
        "type": "text",
        "name": "addressLine1",
        "label": "Address Line 1",
        "required": true
      },
      {
        "type": "text",
        "name": "addressLine2",
        "label": "Address Line 2 (Optional)"
      },
      {
        "type": "text",
        "name": "city",
        "label": "City",
        "required": true
      },
      {
        "type": "text",
        "name": "state",
        "label": "State/Province",
        "required": true
      },
      {
        "type": "text",
        "name": "postalCode",
        "label": "Postal Code",
        "required": true
      },
      {
        "type": "text",
        "name": "country",
        "label": "Country",
        "required": true
      },
      {
        "type": "text",
        "name": "companyName",
        "label": "Company Name (Optional)"
      }
    ]
  },
  "shippingInformation": {
    "label": "Shipping Information (if applicable)",
    "optional": true,
    "fields": [
      {
        "type": "checkbox",
        "name": "useBillingAddress",
        "label": "Same as Billing Address"
      },
      {
        "type": "text",
        "name": "shippingAddressLine1",
        "label": "Shipping Address Line 1",
        "required": true,
        "conditional": "!useBillingAddress"
      },
      {
        "type": "text",
        "name": "shippingAddressLine2",
        "label": "Shipping Address Line 2 (Optional)",
        "conditional": "!useBillingAddress"
      },
      {
        "type": "text",
        "name": "shippingCity",
        "label": "Shipping City",
        "required": true,
        "conditional": "!useBillingAddress"
      },
      {
        "type": "text",
        "name": "shippingState",
        "label": "Shipping State/Province",
        "required": true,
        "conditional": "!useBillingAddress"
      },
      {
        "type": "text",
        "name": "shippingPostalCode",
        "label": "Shipping Postal Code",
        "required": true,
        "conditional": "!useBillingAddress"
      },
      {
        "type": "text",
        "name": "shippingCountry",
        "label": "Shipping Country",
        "required": true,
        "conditional": "!useBillingAddress"
      },
      {
        "type": "text",
        "name": "shippingNotes",
        "label": "Shipping Notes (Optional)"
      }
    ]
  },
  "paymentInformation": {
    "label": "Payment Information",
    "fields": [
      {
        "type": "select",
        "name": "paymentMethod",
        "label": "Payment Method",
        "options": [
          { "value": "creditCard", "label": "Credit Card" },
          { "value": "debitCard", "label": "Debit Card" },
          { "value": "paypal", "label": "PayPal" },
          { "value": "applePay", "label": "Apple Pay" },
          { "value": "googlePay", "label": "Google Pay" },
          { "value": "amazonPay", "label": "Amazon Pay" },
          { "value": "other", "label": "Other (please specify)" }
        ],
        "required": true
      },
      {
        "type": "text",
        "name": "cardHolderName",
        "label": "Cardholder Name",
        "required": true,
        "conditional": "paymentMethod === 'creditCard' || paymentMethod === 'debitCard'"
      },
      {
        "type": "text",
        "name": "cardNumber",
        "label": "Card Number",
        "required": true,
        "conditional": "paymentMethod === 'creditCard' || paymentMethod === 'debitCard'"
      },
      {
        "type": "text",
        "name": "expirationMonth",
        "label": "Expiration Month (MM)",
        "maxLength": 2,
        "required": true,
        "conditional": "paymentMethod === 'creditCard' || paymentMethod === 'debitCard'"
      },
      {
        "type": "text",
        "name": "expirationYear",
        "label": "Expiration Year (YYYY)",
        "maxLength": 4,
        "required": true,
        "conditional": "paymentMethod === 'creditCard' || paymentMethod === 'debitCard'"
      },
      {
        "type": "text",
        "name": "cvv",
        "label": "CVV",
        "maxLength": 3,
        "required": true,
        "conditional": "paymentMethod === 'creditCard' || paymentMethod === 'debitCard'"
      },
      {
        "type": "email",
        "name": "paypalEmail",
        "label": "PayPal Email",
        "required": true,
        "conditional": "paymentMethod === 'paypal'"
      },
      {
        "type": "text",
        "name": "otherPaymentDetails",
        "label": "Other Payment Details",
        "conditional": "paymentMethod === 'other'"
      }
    ]
  }
}