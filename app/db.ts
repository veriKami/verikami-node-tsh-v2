//: ----------------------------------------------------------------------------
//: veriKami // db.ts
//: module: https://www.npmjs.com/package/node-json-db
//: ----------------------------------------------------------------------------
import { JsonDB, Config } from "node-json-db";

//: ----------------------------------------------------------------------------
// The first argument is the database filename. If no extension is used, '.json' is assumed and automatically added.
// The second argument is used to tell the DB to save after each push
// If you set the second argument to false, you'll have to call the save() method.
// The third argument is used to ask JsonDB to save the database in a human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
//: ----------------------------------------------------------------------------
const db = new JsonDB(new Config("data/db.json", true, true, "/"));

//console.log("==================================");
//console.log(db);
//console.log("==================================");

export { db };

//: NOTES
//: ----------------------------------------------------------------------------
// Easier than try catch when the path doesn't lead to data
// This will return `myDefaultValue` if `/super/path` doesn't have data, otherwise it will return the data
// var data = await db.getObjectDefault<string>("/super/path", "myDefaultValue");
