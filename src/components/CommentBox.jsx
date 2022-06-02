import { Avatar, Box,Button,Typography,Divider } from '@mui/material';
import React, {useEffect, useState} from 'react'
import theme from 'theme';
import { useSharedState } from 'utils/store';
import CommentHeader from './CommentHeader';
import CommentInputBox from './CommentInputBox';
import EditField from './EditField';
import InputField from './InputField';
import ScoreButton from './ScoreButton';


function CommentBox(props) {
  const [state,setState] = useSharedState();
  const {users,currentUser} = state;

  const {id, content, createdAt, score,user,replies, replyingTo, selected,setSelected} = props;
  const [editText,setEditText] = useState(content);

  function handlePlus() {
    console.log("upvoting");
  }
  function handleMinus() {
    console.log("downvoting");
  }
  function handleEdit(){
    setSelected(-id);
  }
  function handleReply(){
    setSelected(id);
  }

  function handleEditTextChange(e) {
    setEditText(e.target.value);
  }
  function findIndex(id){
    let indices = {
      c: -1,
      r: -1
    }
    state.comments.forEach((comment,index) => {
      if (comment.id === id) { 
        indices.c = index;
        return; 
      }

      indices.r = comment.replies.findIndex((r) => r.id === id);
      if (indices.r !== -1) {
        indices.c = index;
        return;
      }
    })
    return indices;
  }
  function handleEditSubmit() { //on submitting edit text change
    let updatedComments = state.comments;
    
    let indices = findIndex(id);
    if (indices.c !== -1 && indices.r === -1) {
      updatedComments[indices.c] = {...updatedComments[indices.c], content: editText}
    } else if (indices.r !== -1 && indices.c !== -1) {
      updatedComments[indices.c].replies[indices.r] = {...updatedComments[indices.c].replies[indices.r], content: editText}
    }

    setState(prev => {return {
      ...prev,
      comments: updatedComments
    }})
    setSelected(0);
  }
  function handleDelete() { //on submitting edit text change
    let updatedComments = state.comments;
    
    let indices = findIndex(id);
    if (indices.c !== -1 && indices.r === -1) {
      updatedComments[indices.c] = {...updatedComments[indices.c], content: "\0"}
    } else if (indices.r !== -1 && indices.c !== -1) {
      updatedComments[indices.c].replies[indices.r] = {...updatedComments[indices.c].replies[indices.r], content: "\0"}
    }

    setState(prev => {return {
      ...prev,
      comments: updatedComments
    }})
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
        {content !== "\0" && <ScoreButton score={score} onPlus={handlePlus} onMinus={handleMinus}/>}
        <Box sx={{flexGrow: 1, ml: 3, }}>
          <CommentHeader user={user} createdAt={createdAt} onDelete={handleDelete} onEdit={handleEdit} onReply={handleReply} reply={selected === id} edit={selected === -id} deleted={content === "\0"}/>
          {content !== "\0" ? 
            (selected === -id) ? 
              <EditField defaultValue={content} onChange={handleEditTextChange} onSubmit={handleEditSubmit}/>
              : 
              <Typography variant='body' sx={{flexGrow: 1, '& > span': {...theme.typography.primaryAction} }} component='p'>
                {replyingTo && <span>{'@' + replyingTo + ' '}</span>}
                {content.split('\n').map((line,i) => {return (<React.Fragment key={i}>
                  {line}
                  <br/>
                  </React.Fragment>)})}
              </Typography>
            :
            <Typography variant='deleted'>This comment has been deleted.</Typography>
          }
          
        </Box>
      </Box>
      {(selected === id) && <CommentInputBox type='reply' replyingTo={user} insertAt={findIndex(id).c} setSelected={setSelected}/>}
      {replies && replies.length > 0 && 
        <Box sx={{display: 'flex'}}>
          <Divider orientation='vertical' sx={{mx: '44px', borderRightWidth: '2px', borderColor: theme.palette.clr300}} flexItem/>
          <Box sx={{'& > * + *': {mt: 2}}}>
            {replies.map(reply => {
              return (
                <CommentBox key={reply.id} {...reply} selected={selected} setSelected={setSelected}/>
              )
            }) }
          </Box>
        </Box>
      }

    </>
  )
}

export default CommentBox