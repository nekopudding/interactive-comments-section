import { Box,Stack } from '@mui/material';
import React, {useState, useEffect} from 'react'
import {useSharedState} from 'utils/store';
import CommentBox from './CommentBox';
import CommentInputBox from './CommentInputBox';

function Main() {
  const [state,setState] = useSharedState();
  const {comments} = state;
  const [selected,setSelected] = useState(0); //0 for none, -id for edit, id for reply

  useEffect(()=> {
    ['click','keydown'].forEach(event => 
      window.addEventListener(event, (e)=> {
        if(e.target.id === 'root' || e.code === "Escape") {
          setSelected(0);
        }
      })
    )
  },[])

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
            selected={selected}
            setSelected={setSelected}
            {...c}
          />
        )}
        <CommentInputBox type='comment'/>
      </Stack>

    </>
  )
}

export default Main