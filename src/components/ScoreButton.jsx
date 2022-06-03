import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react'
import theme from 'theme';
import {ReactComponent as PlusIcon} from 'images/icon-plus.svg'
import {ReactComponent as MinusIcon} from 'images/icon-minus.svg'

function ScoreButton(props) {
  const {score,onPlus,onMinus, upvoted,downvoted} = props;
  return (
    <>
      <Stack 
        sx={{
          height: '100px', 
          width: '40px',
          bgcolor: theme.palette.clr200,
          borderRadius: '4px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <IconButton 
          sx={{
            m:0, p:1.5, 
            height: 36, width: 36,
            borderRadius: 0, 
            '& path': {
              fill: upvoted ? theme.palette.primary.main : 'default',
            },
            '&:hover': {bgcolor: 'transparent'},
            '&:active *': {fill: theme.palette.primary.main}
          }}
          disableRipple
          onClick={onPlus}
        >
          <PlusIcon/>
        </IconButton>
        <Typography variant="scoreText">{score}</Typography>
        <IconButton 
          sx={{
            m:0, p:1.5, 
            height: 36, width: 36,
            borderRadius: 0, 
            '& path': {
              fill: downvoted ? theme.palette.primary.main : 'default',
            },
            '&:hover': {bgcolor: 'transparent'},
            '&:active path': {fill: theme.palette.primary.main}
          }}
          disableRipple
          onClick={onMinus}
        >
          <MinusIcon/>
        </IconButton>
      </Stack>
    </>
  )
}

export default ScoreButton