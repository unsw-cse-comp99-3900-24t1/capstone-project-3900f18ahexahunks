const { create } = require('xmlbuilder2');

/**
 * Convert JSON to UBL XML
 * @param {object} jsonData - The JSON data to be converted
 * @returns {string} - The UBL XML string
 */
function convertJsonToUbl(jsonData) {
    const vendorAddress = jsonData.vendor.address.split('\n');
    const billToAddress = jsonData.bill_to_address.split('\n');

    const doc = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('Invoice', { xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2', 'xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2', 'xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2' })
            .ele('cbc:ID').txt(jsonData.invoice_number).up()
            .ele('cbc:IssueDate').txt(jsonData.date).up()
            .ele('cbc:InvoiceTypeCode').txt('380').up()
            .ele('cbc:DocumentCurrencyCode').txt(jsonData.currency_code).up()
            .ele('cac:AccountingSupplierParty')
                .ele('cac:Party')
                    .ele('cac:PartyName')
                        .ele('cbc:Name').txt(jsonData.vendor.name).up()
                    .up()
                    .ele('cac:PostalAddress')
                        .ele('cbc:StreetName').txt(vendorAddress[0] || '').up()
                        .ele('cbc:CityName').txt(vendorAddress[1] || '').up()
                        .ele('cbc:PostalZone').txt(vendorAddress[2] || '').up()
                        .ele('cac:Country')
                            .ele('cbc:IdentificationCode').txt('US').up() // Assuming country code as US, adjust if necessary
                        .up()
                    .up()
                .up()
            .up()
            .ele('cac:AccountingCustomerParty')
                .ele('cac:Party')
                    .ele('cac:PartyName')
                        .ele('cbc:Name').txt(jsonData.bill_to_name || 'Client Name').up()
                    .up()
                    .ele('cac:PostalAddress')
                        .ele('cbc:StreetName').txt(billToAddress[0] || '').up()
                        .ele('cbc:CityName').txt(billToAddress[1] || '').up()
                        .ele('cbc:PostalZone').txt(billToAddress[2] || '').up()
                        .ele('cac:Country')
                            .ele('cbc:IdentificationCode').txt('US').up() // Assuming country code as US, adjust if necessary
                        .up()
                    .up()
                .up()
            .up()
            .ele('cac:TaxTotal')
                .ele('cbc:TaxAmount', { currencyID: jsonData.currency_code }).txt(jsonData.tax).up()
            .up()
            .ele('cac:LegalMonetaryTotal')
                .ele('cbc:LineExtensionAmount', { currencyID: jsonData.currency_code }).txt(jsonData.subtotal).up()
                .ele('cbc:TaxExclusiveAmount', { currencyID: jsonData.currency_code }).txt(jsonData.subtotal).up()
                .ele('cbc:TaxInclusiveAmount', { currencyID: jsonData.currency_code }).txt(jsonData.total).up()
                .ele('cbc:PayableAmount', { currencyID: jsonData.currency_code }).txt(jsonData.total).up()
            .up();

    jsonData.line_items.forEach(item => {
        doc.ele('cac:InvoiceLine')
            .ele('cbc:ID').txt(item.id).up()
            .ele('cbc:InvoicedQuantity', { unitCode: item.unit_of_measure || 'EA' }).txt(item.quantity).up()
            .ele('cbc:LineExtensionAmount', { currencyID: jsonData.currency_code }).txt(item.total).up()
            .ele('cac:Item')
                .ele('cbc:Description').txt(item.description).up()
            .up()
            .ele('cac:Price')
                .ele('cbc:PriceAmount', { currencyID: jsonData.currency_code }).txt(item.price).up()
            .up()
        .up();
    });

    const xmlString = doc.end({ prettyPrint: true, indent: '  ', newline: '\n' });

    return xmlString;
}

module.exports = { convertJsonToUbl };