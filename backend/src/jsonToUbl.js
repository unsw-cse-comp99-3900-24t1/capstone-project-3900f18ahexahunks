const { create } = require('xmlbuilder2');

/**
 * Convert JSON to UBL XML
 * @param {object} jsonData - The JSON data to be converted
 * @returns {string} - The UBL XML string
 */
function convertJsonToUbl(jsonData) {
    const doc = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('Invoice', { xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2' })
        .ele('cbc:ID').txt(jsonData.invoiceNumber).up()
        .ele('cbc:IssueDate').txt(jsonData.issueDate).up()
        .ele('cac:AccountingSupplierParty')
            .ele('cbc:CustomerAssignedAccountID').txt(jsonData.supplier.id).up()
            .ele('cbc:Party')
                .ele('cbc:PartyName').txt(jsonData.supplier.name).up()
            .up()
        .up()
        .ele('cac:AccountingCustomerParty')
            .ele('cbc:CustomerAssignedAccountID').txt(jsonData.customer.id).up()
            .ele('cbc:Party')
                .ele('cbc:PartyName').txt(jsonData.customer.name).up()
            .up()
        .up()
        .ele('cac:InvoiceLine')
            .ele('cbc:ID').txt(jsonData.items[0].id).up()
            .ele('cbc:InvoicedQuantity', { unitCode: 'EA' }).txt(jsonData.items[0].quantity).up()
            .ele('cbc:LineExtensionAmount', { currencyID: 'USD' }).txt(jsonData.items[0].lineExtensionAmount).up()
            .ele('cac:Item')
                .ele('cbc:Description').txt(jsonData.items[0].description).up()
            .up()
            .ele('cac:Price')
                .ele('cbc:PriceAmount', { currencyID: 'USD' }).txt(jsonData.items[0].price).up()
            .up()
        .up()
        .end({ prettyPrint: true });

    return doc;
}

module.exports = { convertJsonToUbl };