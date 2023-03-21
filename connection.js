//DB connection
// const con=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"invoice",
//     port:3308
//   });
//   con.connect((err)=>{
//     if(err) throw err;
//     console.log("Connection successful !!!");
//   })
const constring="server=.;Database=Exam;Trusted_connection=Yes;Driver={SQL Server Native Client 11.0}";
module.exports.constring=constring;

//  module.exports.con=con;