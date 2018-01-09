const Knex = require('knex');
const Bookshelf = require('bookshelf');

class DB {

       constructor() {
         this.knex = new Knex({
           client: 'mysql',
           connection: {
             host: process.env.RDS_HOST,
             user: process.env.RDS_USER,
             password: process.env.RDS_PASSWORD,
             database: process.env.RDS_DB,
             charset: 'utf8',
           },

         });
         this.bookshelf = new Bookshelf(this.knex);
       }

       destroy() {
         this.bookshelf.knex.destroy();
       }

    }

module.exports = DB;
