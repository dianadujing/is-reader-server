
/*
 * GET Note data.
 */

var note = require('../models/note_model.js');
var NoteModel = note.model;

exports.addNote = function(req, res){
  var note = new NoteModel({
    user_id: req.cookies.user_id,
    book_id: req.body.book_id,
    page: req.body.page,
    position: req.body.position,
    is_hightlight: req.body.position,
    notes: req.body.notes
  });
  note.save(function (err) {
    if (!err) {
      return console.log("Note added");
    } else {
      return console.log(err);
    }
  });
  return res.send(note);
};

exports.fetchNotes = function(req, res){
  return NoteModel.find({book_id: req.params.id, page: req.params.page, user_id: req.cookies.user_id}, function (err, notes) {
    console.log(notes);
    if (!err) {
      return res.jsonp(notes);
    } else {
      return res.jsonp(false);
    }
  });
};