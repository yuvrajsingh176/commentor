import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
  text: String,
  score: Number,
  createdAt: { type: Date, default: Date.now },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
  userName: String,
  userImage: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  scoredBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
  ]
});
const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;