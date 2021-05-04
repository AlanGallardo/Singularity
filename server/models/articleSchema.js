import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
    title: String,
    description: String,
    author: String,
    bannerImage: String,
    tags: [String],
    likes: {
        type: Number,
        default: 0,
    },
    visualizations: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

var ArticleModel = mongoose.model('ArticleModel', articleSchema);

export default ArticleModel;