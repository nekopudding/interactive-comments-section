import React, { useEffect } from 'react';
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
  const headerHeight = 48;

  useEffect(()=> {
    if (!setState) return;

    const comments = JSON.parse(localStorage.getItem("comments"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!comments || !currentUser) return;
    setState((prev) => ({
      ...prev,
      comments,
      currentUser
    }));
  },[setState]) //load the last currentUser, comments, 

  useEffect(()=> { 
    if (!state || !state.comment || !state.currentUser) return;
    localStorage.setItem("comments", JSON.stringify(state.comments));
    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  },[state])  

  return (
    <SharedStateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header headerHeight={headerHeight}/>
        <Main/>
        <Footer/>
      </ThemeProvider>
    </SharedStateProvider>
  );
}

export default App;