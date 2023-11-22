import mongoose from 'mongoose';


const ReplySchema = new mongoose.Schema({
  text: String,
  image: String, // Assuming 'image' is a URL or a path to the image
  score: Number, // Assuming 'score' is a numerical value
  userName: String,
  userImage:String,
  createdAt: { type: Date, default: Date.now }, // Automatically set the current date and time
  // Add other reply-related fields as needed
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

const Reply = mongoose.model('Reply', ReplySchema);

export default Reply;