import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [loginPage, setLoginPage] = useState(true);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  function handleChange (e) {
    e.preventDefault();
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!state.email) {
      alert("EMAIL IS REQUIRED")
      return;
    }

    if (!state.password) {
      alert("Password is required")
      return;
    }
    try {
      if (!loginPage) {
        const res = await axios.put('/users/register', {
          email: state.email,
          password: state.password,
        });
        if (!res.data) {
          throw "Error fetching data"
        }
        const { userId } = res.data;
        localStorage.setItem('user', userId);
        setState({ email: '', password: '' })
        history.push('/');
      } else {
        const res = await axios.post('/users/login', {
          email: state.email,
          password: state.password,
        });
        if (!res.data) {
          throw "Error fetching data"
        }
        console.log("RES", res.data);
        const { userId } = res.data;
        localStorage.setItem('user', userId);
        setState({ email: '', password: '' })
        history.push('/');
      }
    } catch (err) {

      alert(err);
      return;
    }
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.push('/');
    }
  }, [])
  
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          { loginPage ? 'Sign in' : 'Sign up'}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={state.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={state.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <div onClick={() => setLoginPage(!loginPage)}>
                <Link href="#" variant="body2">
                  {loginPage ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </Link>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    )
  }

export default Login;