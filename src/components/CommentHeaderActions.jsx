import { Box } from '@mui/material';
import React from 'react'
import CommentAction from './CommentAction';
import { useSharedState } from 'utils/store';

function CommentHeaderActions(props) {
  const [state,setState] = useSharedState();
  const {currentUser} = state;
  const {user,onDelete,onEdit,onReply, reply,edit} = props;
  return (
    <Box className="header-right" sx={{ml: {laptop: 3, mobile: 0}, display: 'flex', alignItems: 'center'}}>
      {(user === currentUser) ? 
        <>
          <CommentAction type='delete' onClick={onDelete}/> 
          <CommentAction type='edit' sx={{ml: 3}} onClick={onEdit} edit={edit}/>
        </> 
        :
        <CommentAction type='reply' onClick={onReply} reply={reply}/>
      }
    </Box>
  )
}

export default CommentHeaderActions