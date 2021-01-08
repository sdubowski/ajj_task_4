const app = require('./app');
app.set('port', process.env.PORT || 5000);
dbConnectionTest = require('./repository/dbconnector')


dbConnectionTest();

const server = app.listen(app.get('port'), () => {
    console.log(`Product service is listening on 
    ${server.address().port}`);
});

