const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema({
    quizId: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    questionText: {
      type: String,
      required: true
    },
    options: [
      {
        text: {
          type: String,
          required: true
        },
        isCorrect: {
          type: Boolean,
          required: true
        }
      }
    ]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Question', questionSchema);
  