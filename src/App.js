import React, { useEffect, useState } from 'react';
import './App.css';

import { SharedStateProvider } from './utils/store';
import Header from 'components/Header';
import Main from 'components/Main';
import Footer from 'components/Footer';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'theme';
import {useSharedState} from 'utils/store';

function App() {
  const [state, setState] = useSharedState();
  const [windowW,setWindowW] = useState(window.innerWidth);
  const headerHeight = 56;

  // useEffect(()=> {
  //   if (!setState) return;

  //   const comments = JSON.parse(localStorage.getItem("comments"));
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   const users = JSON.parse(localStorage.getItem("users"));

  //   if (!comments || !currentUser || !users) return;
  //   setState((prev) => ({
  //     ...prev,
  //     comments,
  //     currentUser,
  //     users
  //   }));
  // },[setState]) //load the last currentUser, comments, 

  useEffect(()=>{
    window.addEventListener('resize', ()=>{
      setWindowW(window.innerWidth)
    })
  },[])

  // useEffect(()=> { 
  //   if (!state || !state.comment || !state.currentUser) return;
  //   localStorage.setItem("comments", JSON.stringify(state.comments));
  //   localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  // },[state])  

  return (
    <SharedStateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header headerHeight={headerHeight}/>
        <Main windowW={windowW}/>
      </ThemeProvider>
    </SharedStateProvider>
  );
}

export default App;