import { Box } from '@mui/material';
import React from 'react'
import theme from 'theme';
import ScoreButton from './ScoreButton';

function CommentBox(props) {
  const {id, content, createdAt, score,author,replies} = props;
  return (
    <>
      <Box 
        sx={{
          display: 'flex', 
          width: '100%', 
          minHeight: '150px',
          bgcolor: theme.palette.clr100,
          borderRadius: "4px",
          alignItems: 'center',
          p: 3,
        }}
      >
        <ScoreButton score={score}/>
      </Box>
    </>
  )
}

export default CommentBox