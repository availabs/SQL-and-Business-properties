var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:Jedi21funk@mars.availabs.org:5432/infogroup';
var db = pgp(connectionString);

// add query functions



function geobyzip(req, res, next) {
  var zipcode = req.params.zipcode;
  console.log(zipcode);
  db.many(`select id, ST_ASGeoJSON(ST_transform(geom,4326)), "CONAME", "NAICSCD", 
       "NAICSDS", "LEMPSZCD", "LEMPSZDS", "ALEMPSZ",  "BE_Payroll_Expense_Code", 
       "BE_Payroll_Expense_Range", "BE_Payroll_Expense_Description" from businesses_2014  where "PRMZIP" = ${zipcode}` )
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  geobyzip: geobyzip,
 // getSinglePuppy: getSinglePuppy,
 // createPuppy: createPuppy,
 // updatePuppy: updatePuppy,
 // removePuppy: removePuppy
};
