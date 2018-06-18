const ReqRes = require('serverless-req-res');
const Customer = require('./models/customer');
const bookshelf = require('./DB');

module.exports.get = new ReqRes(async (req, res) => {
    const db = new bookshelf();
    const customer = new Customer(db.bookshelf);
      const model = await customer.getCustomers(req.params.id, req.query.pp, req.query.pg);
      db.destroy();
      res.json(model);
  }).catch((errors, req, res) => {
    console.log(errors);
    res.error(404, errors[0]);
  }).cors(true).run;
