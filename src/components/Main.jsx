import React from 'react'
import {useSharedState} from 'utils/store';
import CommentBox from './CommentBox';

function Main() {
  const [state,setState] = useSharedState();
  const {comments} = state;

  return (
    <>
      {comments.map((c)=> 
        <CommentBox 
          key={c.id} 
          {...c}
        />
      )}
    </>
  )
}

export default Main