var express = require("express");
var router = express.Router();
var fs = require('fs')

const gettData = () => {
  const jsonData = fs.readFileSync('routes/data.json');
  return (JSON.parse(jsonData));  
}
const saveData = (data) => {
const stringifyData = JSON.stringify(data)
fs.writeFileSync('routes/data.json', stringifyData)
}
/* GET users listing. */


router.get('/edituser/:email',function(req,res){
  res.render('edituser',{email:req.params.email});
})
//update APi 



router.put('/edituser/:email',function(req,res,next){
  var exist = gettData()
  fs.readFile('routes/data.json', 'utf8', (err, data) => {
    const userdata =exist.filter((item)=>{
      return item.email==req.params.email;
    })
    userdata.push(req.body)
    saveData(userdata);
    res.render('Users',{data:[req.body]})
  }, true);
})

//Delete Api

router.delete('/edituser/delete/:email',function(req,res){
  fs.readFile('routes/data.json', 'utf8', (err, data) => {
    var existAccounts = gettData();
    const userdata = existAccounts.filter((item)=>{
      return item.email !== req.params.email;
    })
    saveData(userdata);
    res.send(`account is Deleted with ${req.params.email} from json file`);
  }, true);
})

// ALL  USERLIST APi
router.get('/Userlist',function(req,res,next){
  fs.readFile('routes/data.json','utf8',function(err,data){
    if(err) throw err;
    const array = JSON.parse(data)
     res.json(array)
    
  })

})




module.exports = router;
