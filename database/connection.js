import mongoose from "mongoose";

let dbString =
  "mongodb+srv://ramkrishnaindal:nWDMvHVL63V4wFbu@ramkrishna.yixfe.mongodb.net/?retryWrites=true&w=majority";

const connectMongo = async () => mongoose.connect(dbString);

export default connectMongo;
//const Mongo
// dbconf = require('../Database/db.json');

// let dbString = 'mongodb://' + dbconf.dbcredentials.user;
// dbString = dbString + ':' + dbconf.dbcredentials.password;
// dbString = dbString + '@' + dbconf.dbcredentials.address;
// dbString = dbString + ':' + dbconf.dbcredentials.port;
// dbString = dbString + '/' + dbconf.dbcredentials.database;

//if (process.env.NODE_ENV == "development") {
//dbString = 'mongodb://localhost:27017/banbanjara';
//}
