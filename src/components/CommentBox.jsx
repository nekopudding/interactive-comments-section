import { Avatar, Box,Button,Typography,Divider } from '@mui/material';
import React from 'react'
import theme from 'theme';
import { useSharedState } from 'utils/store';
import CommentHeader from './CommentHeader';
import ScoreButton from './ScoreButton';


function CommentBox(props) {
  const [state,useState] = useSharedState();
  const {users,currentUser} = state;
  const {id, content, createdAt, score,user,replies, replyingTo} = props;

  function handlePlus() {
    console.log("upvoting");
  }
  function handleMinus() {
    console.log("downvoting");
  }
  function handleDelete(){
    console.log("deleting");
  }
  function handleEdit(){
    console.log("editing");
  }
  function handleReply(){
    // console.log(replies);
  }

  return (
    <>
      <Box 
        sx={{
          display: 'flex', 
          width: '100%', 
          minHeight: '150px',
          bgcolor: theme.palette.clr100,
          borderRadius: "4px",
          p: 3,
        }}
      >
        <ScoreButton score={score} onPlus={handlePlus} onMinus={handleMinus}/>
        <Box sx={{flexGrow: 1, ml: 3, }}>
          <CommentHeader user={user} createdAt={createdAt} onDelete={handleDelete} onEdit={handleEdit} onReply={handleReply}/>
          <Typography variant='body' sx={{flexGrow: 1, mt: '20px'}} component='p'>{content}</Typography>
        </Box>
      </Box>
      {replies && replies.length > 0 && 
        <Box sx={{display: 'flex'}}>
          <Divider orientation='vertical' sx={{mx: 5, borderRightWidth: '2px', borderColor: theme.palette.clr300}} flexItem/>
          <Box sx={{'& > * + *': {mt: 2}}}>
            {replies.map(reply => {
              return (
                <CommentBox key={reply.id} {...reply}/>
              )
            }) }
          </Box>

        </Box>
      }

    </>
  )
}

export default CommentBox