const mongoose = require ('mongoose');
const Investment = require ('../models/Investments');

module.exports = {
  async listInvestments (request, response) {
    const investments = await Investment.find ();
    return response.json (investments);
  },

  async storeInvestment (request, response) {
    const investment = await Investment.create (request.body);
    return response.json (investment);
  },

  async deleteInvestment (request, response) {
    const investment = await Investment.findOneAndDelete (
      {_id: request.param ('id')},
      request.body
    );
    return response.json (investment);
  },
};
