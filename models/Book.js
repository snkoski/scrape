var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {
    type: String,
    // required: true
  },
  link: {
    type: String,
    // required: true
  },
  image: {
      type: String,
      
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var Book = mongoose.model("Book", BookSchema);

module.exports = Book;
