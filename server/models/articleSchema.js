import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  author: String,
  authorImage: String,
  bannerImage: String,
  tags: [String],
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

export default mongoose.model('ArticleModel', articleSchema);
