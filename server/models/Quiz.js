const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const quizSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    timer: {
      type: Number, // in minutes
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }, { timestamps: true });
  
module.exports = mongoose.model('Quiz', quizSchema);