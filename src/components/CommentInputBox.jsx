import { Avatar, Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import theme from 'theme'
import { useSharedState } from 'utils/store'
import InputField from './InputField'

function CommentInputBox(props) {
  const [state,setState] = useSharedState()
  const {users,currentUser} = state;
  const {type} = props;
  const [text,setText] = useState("");
  const inputField = useRef(null);

  function handleSend(){
    console.log(text);
    console.log('sending');
    inputField.current.value = '';
  }
  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <Box 
        id={type==='reply' ? 'replyBox' : ''} 
        sx={{
          display: 'flex', 
          width: '100%', 
          minHeight: '150px',
          bgcolor: theme.palette.clr100,
          borderRadius: "4px",
          p: 3,
        }}
      >
        <Avatar alt="avatar" src={process.env.PUBLIC_URL + users.find(user => user.username === currentUser).image.png} sx={{mr: 2}}/>
        <InputField handleChange={handleChange} type={type} r={inputField}/>
        <Button 
          variant='contained' 
          size='large' 
          onClick={handleSend}
          sx={{
            width: 104, height: 48, ml:  2, borderRadius: '8px',
            '&:hover': {bgcolor: theme.palette.primary.main, boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'}, 
            '&:active': {bgcolor: theme.palette.primary.light}
          }}
        >
          {type==='reply' ? 'Reply' : 'Send'}
        </Button>
      </Box>
    </>
  )
}

export default CommentInputBox