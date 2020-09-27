var express = require("express");
var app = express();

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

/* 3. 以後、アプリケーション固有の処理 */

// 写真のサンプルデータ
var photoList = [
    {
        id: "001",
        name: "photo001.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo001.jpg"
    },{
        id: "002",
        name: "photo002.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo002.jpg"
    }
]

// 写真リストを取得するAPI
app.get("/api/photo/list", function(req, res, next){
    res.json(photoList);
});
app.get("/api/photo/:photoId", function(req, res, next){
  var photo;
  for (i = 0; i < photoList.length; i++){
      if (photoList[i].id == req.params.photoId){
          var photo = photoList[i];
      }
  }
  res.json(photo);
});

app.set('view engine', 'ejs');

// "/"へのGETリクエストでindex.ejsを表示する。拡張子（.ejs）は省略されていることに注意。
app.get("/", function(req, res, next){
    res.render("index", {});
});
module.exports = app;
