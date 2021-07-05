var express = require('express');
var router = express.Router();
var fs = require('fs');
const getData = () => {
  const jsonData = fs.readFileSync('routes/data.json');
  return JSON.parse(jsonData);  
}
const savetData = (data) => {
const stringifyData = JSON.stringify(data)
fs.writeFileSync('routes/data.json', stringifyData)
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Success', function(req, res, next) {
  res.render('Success');
});
router.post('/register',function(req,res,next){
var existAccounts = getData(); 
   existAccounts.push(req.body);
   savetData(existAccounts);
   const data = JSON.stringify(req.body);
   res.render('Success',{data:data});

})
router.get('/login',function(req,res){
  res.render('login');
})
router.post('/login',function(req,res){
  const email = req.body.email;
  const password = req.body.password; 
  let userdata = getData() 
 const filterdata = userdata.filter((item)=>{
   return item.email===email;
    
  })
  res.render('Users',{data:filterdata});
} )









module.exports = router;
