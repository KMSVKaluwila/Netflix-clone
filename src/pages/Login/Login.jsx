import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import nerflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [SignState, setSignState] = React.useState("Sign In")

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (SignState === "Sign In") {
      await login(email, password);
    } else {
      await signup(email, password);
    }
    setLoading(false);
  }

  return (
    loading ? <div className="login-spinner">
      <img src={nerflix_spinner} alt="" className='spinner' />
      <h1>Loading...</h1>
    </div> :
      <div className='login'>
        <img src={logo} alt="" className='login-logo' />
        <div className="login-form">
          <h1>{SignState}</h1>

          <form action="">
            <div className="login-form-group">

              {SignState === "Sign Up" && (
                <>
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" value={name} onChange={
                    (event) => {
                      setName(event.target.value)
                    }} placeholder='Enter your username' className='input-fild' required />
                </>
              )}


              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={
                (event) => {
                  setEmail(event.target.value)
                }
              } placeholder='Enter your email' className='input-fild' required />

              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={
                (event) => {
                  setPassword(event.target.value)
                }} placeholder='Enter your password' className='input-fild' required />

              <button type="submit" onClick={user_auth} className='login-button'>{SignState}</button>
            </div>

            <div className="checkbox-group">
              <label class="form-control">
                <input type="checkbox" id="remember-me" />
                Remember me
              </label>
              <p className='login-need-help'>Need help?</p>
            </div>

            <div className="form-switch">
              {
                SignState === "Sign In" ?
                  <p>Don't have an account? <a href="#" className='form-switch-link' onClick={() => setSignState("Sign Up")}>Sign Up</a></p> :
                  <p>Already have an account? <a href="#" className='form-switch-link' onClick={() => setSignState("Sign In")}>Sign In</a></p>
              }
            </div>

          </form>
        </div>
      </div>
  )
}

export default Login
