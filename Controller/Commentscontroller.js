import express from "express";
import Comment from '../modal/Comment.js';
import Reply from "../modal/Reply.js";
import User from "../modal/User.js";

const comments = [];





const createComment = async (req, res) => {
  const { text, score } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required for a comment' });
  }

  try {
    // Create a new Comment document
    const comment = new Comment({
      text,
      score,
      createdAt: new Date(),
      replies: [], // Initialize replies array for the comment
      createdBy: req.user.userId,
      userName: req.user.username, // Assuming you have user information in req.user
    });

    // Save the Comment to the database
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving the comment to MongoDB' });
  }
};
const createReply = async (req, res) => {
  const { text,  score } = req.body;
  const commentId = req.params.commentId;
  console.log(commentId)
  req.body.createdBy = req.user.userId;
  const id = req.user.userId;
  const user = await User.findById(id);
  const curuser = user.username;
  try {
    // Create a new Reply document
    
  
      const reply = new Reply({
          text,
          score,
        // Assuming 'image' is part of the request body
        createdAt: new Date(),
        createdBy: req.user.userId,
    userName:curuser
          // Add other reply-related fields as needed
      });

      // Save the Reply to the database
      const savedReply = await reply.save();

      // Find the corresponding Comment by its ObjectId
      const comment = await Comment.findById(commentId);

      if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
      }

      // Check if the replies array exists in the comment
      if (!comment.replies) {
          comment.replies = [];
      }

      // Add the ObjectId of the saved reply to the Comment's replies array
      comment.replies.push(savedReply);

      // Save the updated Comment to the database
      await comment.save();
console.log(comment)
      // Respond with the saved Reply
      res.json(comment);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error saving the reply to MongoDB' });
  }
}; 

const getAllComments = async (req, res) => {
    const comment = await Comment.find({}).populate('replies');
    res.json(comment);
}
const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    const comment = await Comment.findByIdAndDelete(commentId);
    res.json({msg:"okay"})
}
const deleteReply = async (req, res) => {
  const { commentId, replyId } = req.params;
  try {
    const comment = await Comment.findById(commentId);

    const replyIndex = comment.replies.findIndex(reply => reply._id.toString() === replyId);
    if (replyIndex === -1) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    comment.replies.splice(replyIndex, 1);
    await comment.save();

    return res.status(204).json({message:"deleted"});

  }
  catch (e) {
    console.error('Error deleting reply:', error);
    return res.status(500).json({ message: 'Internal server error' });
}
  // const reply=await C
}
const scoredBy = [];
const scoreAdd=async(req,res) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment  ) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.scoredBy.includes(userId) ) {
      return res.status(400).json({ msg: "you have already liked" });
    }
   
    comment.score = comment.score + 1;
    comment.scoredBy.push(userId);
    await comment.save();
    res.json({ msg: "done" });
  }
  catch (e) {
    console.error('error adding score:', e);
    return res.status(500).json({ message: 'Internal server error' });
  }

  

}
const scoreDec=async(req,res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    comment.score = comment.score - 1;
    await comment.save();
    res.json({ msg: "done" });
  }
  catch (e) {
    console.error('error adding score:', e);
    return res.status(500).json({ message: 'Internal server error' });
  }

  

}
export { createComment, createReply, getAllComments, deleteComment ,deleteReply,scoreAdd,scoreDec,};













{
  /*
  const createComment = async (req, res) => {
      const { text } = req.body;
      if (!text) {
          return res.status(400).json({ error: 'Text is required for a comment' });
      }
      try {
          const comment = new Comment({ text, replies: [] });
          const savedComment = await comment.save();
          res.json(savedComment);
      } catch (error) {
          res.status(500).json({ error: 'Error saving the comment to MongoDB' });
      }
  }
    const createReply = async (req, res) => {
    const { text,  score } = req.body;
    const commentId = req.params.commentId;
    console.log(commentId)
    req.body.createdBy = req.user.userId;
    const id = req.user.userId;
    const user = await User.findById(id);
    const curuser = user.username;
    try {
      // Create a new Reply document
      
    
        const reply = new Reply({
            text,
            score,
          // Assuming 'image' is part of the request body
          createdAt: new Date(),
          createdBy: req.user.userId,
      userName:curuser
            // Add other reply-related fields as needed
        });

        // Save the Reply to the database
        const savedReply = await reply.save();

        // Find the corresponding Comment by its ObjectId
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if the replies array exists in the comment
        if (!comment.replies) {
            comment.replies = [];
        }

        // Add the ObjectId of the saved reply to the Comment's replies array
        comment.replies.push(savedReply);

        // Save the updated Comment to the database
        await comment.save();
console.log(comment)
        // Respond with the saved Reply
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving the reply to MongoDB' });
    }
};

const createComment = async (req, res) => {
  const { text, image, score } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required for a comment' });
  }

  try {
    const comment = new Comment({
      text, // Add the image field
      score, // Add the score field
      createdAt: new Date(), // Automatically set the current date and time
      replies: [],
    });

    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving the comment to MongoDB' });
  }
};
*/}