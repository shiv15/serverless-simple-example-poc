const ReqRes = require('serverless-req-res');
const Trip = require('./models/tripMaster');
const bookshelf = require('./DB');

module.exports.get = new ReqRes(async (req, res) => {
    const db = new bookshelf();
    const trip = new Trip(db.bookshelf);
      const model = await trip.getTrips(req.params.id);
      db.destroy();
      res.json(model);
  }).catch((errors, req, res) => {
    console.log(errors)
    res.error(404, errors[0]);
  }).cors(true).run;
