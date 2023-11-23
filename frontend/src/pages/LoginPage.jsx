import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import TypeWriterEffect from 'react-typewriter-effect';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState,createContext, useContext  } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const theme = createTheme();
export default function SignInSide() {
    const myRef = document.querySelector('.scrollable-div')
    const navigate = useNavigate();
    
    const [open, setOpen] = React.useState(false);
    const [error,setError] = React.useState(null);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 
    const data1 = {
      email: data.get('email'),
      password: data.get('password'),
    }

    axios.post('http://localhost:3333/login',data1)
    .then((res)=>{
        console.log("----res------>",res)
        if(res.data.status=="success"){
              navigate('/')
        }else{
          setOpen(true  )
        }
    }).catch((err)=>{
      setError(err.response.data.message)
      setOpen(true  )
    })

  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
      {
        error?(
          <Snackbar open={open} autoHideDuration={6000}   key={"top" + "right"}  anchorOrigin={{ vertical:"top", horizontal:"right" }}  onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
        ):(
          <>
          </>
        )
      }
     
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundColor: "#5cdb95",
            backgroundSize: 'cover',
            display:{sm : "flex",xs:"none"},
            backgroundPosition: 'center',
            alignItems:"center",
            justifyContent:"center"
          }}
        >   <div  style={{padding: "100px"}}>
             <TypeWriterEffect
            
            textStyle={{
                color: '#05386b',
                fontWeight: 500,
                fontSize: '4.5em',
              }}
              startDelay={1000}
              cursorColor="#3F3D56"
              hideCursorAfterText = "true"
              multiText={[
                'CMS',
                'A Content Management System',
                'Manages data of the team ',
              ]}
              multiTextDelay={5000}
              typeSpeed={40}
            scrollArea={myRef}
          />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#5cdb95' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx = {{color:"#05386b"}} >
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
              sx = {{ '& label' :{color:"#5cdb95"},'& label.Mui-focused':{color:"#5cdb95"},'& .MuiOutlinedInput-root':{ '&.Mui-focused fieldset': {  borderColor:"#5cdb95"} }}}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                
                autoComplete="email"
                autoFocus
              />
              <TextField
               sx = {{ '& label' :{color:"#5cdb95"},'& label.Mui-focused':{color:"#5cdb95"},'& .MuiOutlinedInput-root':{ '&.Mui-focused fieldset': {  borderColor:"#5cdb95"} }}}
               margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , backgroundColor:"#5cdb95",'&:hover':{backgroundColor:"#05386b"} }}
              >
                Sign In
              </Button>
              <Grid container>
               
                <Grid item>
                  <Link style={{cursor:"pointer", color:"#05386b"}}   to = "/register" >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}