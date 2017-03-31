//這是一個Member Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');

var Member = function(options) {
  this.User_ID= options.User_ID;
  this.User_Name = options.User_Name;
  this.Department = options.Department;
  this.User_Type= options.User_Type;
  this.Password = options.Password;
};


Member.get = function(memberId, cb) {
  //這邊是當傳入一個memberId時，進入資料庫查出相對應的member資料
  db.select()
    .from('user_t')
    .where({
      id : memberId
    })
    .map(function(row) {
      //將select出來的資料轉換成Member物件
      return new Member(row);
    })
    .then(function(memberList) {
      if(memberList.length) {
        cb(null, memberList[0]);
      } else {
        //這邊要產生一個NotFound err給前端，因為error很常用到，我們會獨立出去一個檔案
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    })
}

//login
Member.getbyaccount = function(userId, cb) {
  db.select()
    .from('user_t')
    .where({
     User_ID : userId
     
      
    })
    .map(function(row) {
      return new Member(row);
    })
    .then(function(memberList) {
      if(memberList.length) { 
        cb(null, memberList[0]);
      } else {
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}



//這樣基本上就完成了一個DataModel會用到的method, 之後有需要的時候再過來新增
module.exports = Member;
