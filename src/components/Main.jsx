import { Box,Stack } from '@mui/material';
import React from 'react'
import {useSharedState} from 'utils/store';
import CommentBox from './CommentBox';

function Main() {
  const [state,setState] = useSharedState();
  const {comments} = state;

  return (
    <>
      <Stack 
        sx={{
          my: 6,
          width: "730px",
          mx: 'auto',
          alignItems: 'center',
          // border: '1px solid red',
          '& > * + *': {
            mt: 2
          }
        }}
      >
        {comments.map((c)=> 
          <CommentBox 
            key={c.id} 
            {...c}
          />
        )}
      </Stack>

    </>
  )
}

export default Main