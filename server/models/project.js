const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const projectSchema = new Schema({
    title: String,
    description: String,
    link: String,
    date: Number,
    image:
    {
        url: String,
        filename: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Extends the finOneAndDelete method to delete 
// also existing reviews attached to the post

projectSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
})

module.exports = mongoose.model('Project', projectSchema);