// const DB = require('../DB');


class Trip {
    constructor(bookshelf) {
      this.bookshelf = bookshelf;
      // this.clientCheckin = bookshelf.Model.extend({
      //   tableName: 'ClientCheckin',
      // });
      // this.Trip = bookshelf.Model.extend({
      //   tableName: 'trip_master',
      // });
    }
    // transform on return
    toViewModel(model) {
      // add fields to omit or to concat/generate
      //  model.set("name", model.get("firstName")+' ' + model.get("lastName"));
      const viewModel = model;
      viewModel.name = `${model.firstName} ${model.lastName}`;
      return viewModel;
    }
    toSaveObject(customer) {
      super.toSaveObject(customer);
      delete customer.name;
      //  delete customer.setAsPrimary;
    }
    async getTrips(customerId) {
      const Trip2 = this.bookshelf.Model.extend({
        tableName: 'customer',
      });
      const trip = new Trip2();
      const model = await trip
        .query((qb) => {
            qb.where('id', '=', `${customerId}`);
        })
        .fetch();
      return model.toJSON();
    }
  }

  module.exports = Trip;
