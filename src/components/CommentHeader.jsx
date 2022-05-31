import React from 'react'
import {Box,Avatar,Typography} from '@mui/material';
import {ReactComponent as ReplyIcon} from "images/icon-reply.svg"
import { useSharedState } from 'utils/store';
import theme from 'theme';
import CommentAction from './CommentAction';

function CommentHeader(props) {
  const [state,useState] = useSharedState();
  const {users,currentUser} = state;
  const {user,createdAt ,onDelete,onEdit,onReply} = props;

  return (
    <>
      <Box sx={{display: 'flex', height: 32, alignItems: 'center', justifyContent: 'space-between'}}>
        <Box className="header-left" sx={{flexGrow: 1, display: 'flex', alignItems: 'center'}}>
          <Avatar 
            alt="avatar"
            src={process.env.PUBLIC_URL + users.find(u => u.username === user).image.png}
            sx={{ width: 32, height: 32 }}   
          />
          <Typography variant="username" sx={{ml:2}}>{user}</Typography>
          {(user === currentUser) && <Typography variant="you" sx={{ml:1, height: 18, bgcolor: theme.palette.primary.main, py:'2px',px:'6px', lineHeight:1, borderRadius: '3px'}}>you</Typography>}
          <Typography variant="body" sx={{ml:2}}>{createdAt}</Typography>
        </Box>
        
        <Box className="header-right" sx={{ml: 3, display: 'flex', alignItems: 'center'}}>
          {(user === currentUser) ? 
            <>
              <CommentAction type='delete' onClick={onDelete}/> 
              <CommentAction type='edit' sx={{ml: 3}} onClick={onEdit}/>
            </> 
            :
            <CommentAction type='reply' onClick={onReply}/>
          }
          
        </Box>

      </Box>
    </>
  )
}

export default CommentHeader