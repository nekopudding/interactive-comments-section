import { AppBar,Box,Toolbar,IconButton,Badge,Menu, MenuItem,Avatar, Typography } from '@mui/material'
import React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useSharedState} from 'utils/store'

function Header() {
  const [state, setState] = useSharedState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectUser = (username) => {
    setAnchorEl(null);
    setState((prev) => ({ ...prev, currentUser: username }))
  }

  return (
    <>
      <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={()=>setAnchorEl(null)}
      sx={{
                display: { xs: 'block', md: 'none' },
              }}
    >
      {state.users.map((user) => {
        console.log(process.env.PUBLIC_URL + user.image.png)
        return (
          <MenuItem onClick={()=>handleSelectUser(user.username)} key={user.username} selected={state.currentUser === user.username}>
            <Avatar alt={user.username} src={process.env.PUBLIC_URL + user.image.png} />
            <Typography variant="body" sx={{ml: 2}}>{user.username}</Typography>
          </MenuItem>
        )
      })}      
    </Menu>

    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            {
              (state.currentUser !== "") ? 
                <Avatar 
                  alt={state.currentUser} 
                  src={process.env.PUBLIC_URL + state.users.find(user => user.username === state.currentUser).image.png}   
                /> :
                <AccountCircle />
            }
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    </>
    
  )
}

export default Header