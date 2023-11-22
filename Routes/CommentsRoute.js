import express from 'express';
const router = express.Router();
import { createComment,createReply,getAllComments,deleteComment,deleteReply ,scoreAdd,scoreDec} from '../Controller/Commentscontroller.js';

router.route('/').get(getAllComments);
router.route('/createComment').post(createComment);
// router.route('/replies').post(createReply);
router.route('/:commentId/replies').post(createReply);

router.route('/:commentId').delete(deleteComment);
router.route('/score/:commentId/increase').post(scoreAdd);
router.route('/score/:commentId/decrease').post(scoreDec);

router.delete('/:commentId/replies/:replyId',deleteReply);

export default router;