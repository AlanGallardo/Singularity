import mongoose from 'mongoose';

const answerSchema = mongoose.Schema({
  answer: String,
  name: String,
  authorImage: String,
  questionId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

export default mongoose.model('AnswerModel', answerSchema);
