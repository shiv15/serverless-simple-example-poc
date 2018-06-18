var Paginator = require('bookshelf-paginator');

class Trip {
    constructor(bookshelf) {
      this.bookshelf = bookshelf;
        this.bookshelf.plugin('bookshelf-page');
    }
    toViewModel(model) {
      const viewModel = model;
      viewModel.name = `${model.firstName} ${model.lastName}`;
      return viewModel;
    }
    toSaveObject(customer) {
      super.toSaveObject(customer);
      delete customer.name;
      //  delete customer.setAsPrimary;
    }
    async getCustomers(customerName, pp, pg) {
      const Trip2 = this.bookshelf.Model.extend({
        tableName: 'customer',
      });
      const trip = new Trip2();
      const model = await trip
        .query((qb) => {
            qb.where('name', '=', `${customerName}`);
        })
        .fetchPage({page: pg, pageSize: pp});
      return model.toJSON();
    }
  }

  module.exports = Trip;
