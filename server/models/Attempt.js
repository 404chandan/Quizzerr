const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const attemptSchema = new mongoose.Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    answers: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: 'Question',
          required: true
        },
        selectedOption: {
          type: Schema.Types.ObjectId,
          ref: 'Question.options'
        }
      }
    ],
    completedAt: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Attempt', attemptSchema);
  