import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  authorImage: String,
  solved: {
    type: Boolean,
    default: false,
  },
  answers: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

export default mongoose.model('QuestionModel', questionSchema);
