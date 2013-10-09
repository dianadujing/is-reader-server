
/*
 * GET home page.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/is_reader');

var Schema = mongoose.Schema;  

var Book = new Schema({
    title: { type: String, required: true },  
    file_name: { type: String, required: true },  
    last_page: { type: Number, required: true }
});

var BookModel = mongoose.model('Book', Book);  

exports.restore = function(req, res){
  return BookModel.findById(req.params.id, function (err, book) {
    console.log(book);
    if (!err) {
      return res.json({
        data: book,
        empty: false
      });
    } else {
      return res.json({
        empty: true
      });
    }
  });
};

exports.save = function(req, res){
  return BookModel.find(req.params.id, function (err, book) {
    book = book[0];
    book.last_page = req.body.last_page;
    return book.save(function (err) {
      if (!err) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    });
  });
};

exports.add = function(req, res){
  var book;
  console.log("ADD: ");
  book = new BookModel({
    title: "JavaScript Web Application",  
    file_name: "jwa.pdf",
    last_page: 12
  });
  book.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(book);
};