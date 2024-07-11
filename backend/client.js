$.post('/validate-ubl', { file: yourFile }, function(data) {
    const validationResults = data.validationResults;
    console.log(validationResults);
});
