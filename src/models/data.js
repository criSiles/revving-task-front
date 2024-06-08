/**
 * @typedef {Object} RawData
 * @property {string} date - Format: YYYY-MM-DD
 * @property {string} invoice_number - Max length: 100
 * @property {number} value - Decimal with max 15 digits and 2 decimal places
 * @property {number} haircut_percent - Decimal with max 5 digits and 2 decimal places
 * @property {number} daily_fee_percent - Decimal with max 5 digits and 3 decimal places
 * @property {string} currency - Max length: 10
 * @property {string} revenue_source - Max length: 100
 * @property {string} customer - Max length: 100
 * @property {number} expected_payment_duration - Integer
 */
