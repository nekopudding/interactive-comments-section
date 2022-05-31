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
  function handleDelete(){
    console.log("deleting");
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
  function handleUpdate() {
    let updatedComments = state.comments;
    let rIndex = -1;
    state.comments.forEach((c,index) => {
      if (c.id === id) { 
        updatedComments[index] = {...updatedComments[index], content: editText}
        return; 
      }

      rIndex = c.replies.findIndex((r) => r.id === id);
      if (rIndex !== -1) {
        updatedComments[index].replies[rIndex] = {...updatedComments[index].replies[rIndex], content: editText}
        return;
      }
    })
    setState(prev => {return {
      ...prev,
      comments: updatedComments
    }})
    setSelected(0);
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
          <CommentHeader user={user} createdAt={createdAt} onDelete={handleDelete} onEdit={handleEdit} onReply={handleReply} reply={selected === id} edit={selected === -id}/>
          {(selected === -id) ? 
            <EditField defaultValue={content} onChange={handleEditTextChange} onUpdate={handleUpdate}/>
          : <Typography variant='body' sx={{flexGrow: 1}} component='p'>
              {content.split('\n').map(line => {return (<React.Fragment key={line}>
                {line}
                <br/>
                </React.Fragment>)})}
            </Typography>
          }
        </Box>
      </Box>
      {(selected=== id) && <CommentInputBox type='reply'/>}
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