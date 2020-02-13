const express = require ('express');
const routes = express.Router ();
const mongoose = require ('mongoose');

const InvestmentController = require ('./controllers/InvestmentController');

// Database Connection
mongoose.connect (
  'mongodb+srv://gorilatest:nwpd2gorilatest22@cluster0-4sqk2.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

routes.get ('/', function (request, response) {
  response.sendStatus (401);
});
routes.get ('/investments', InvestmentController.listInvestments);
routes.post ('/investments', InvestmentController.storeInvestment);
routes.delete ('/investments/:id', InvestmentController.deleteInvestment);

module.exports = routes;
