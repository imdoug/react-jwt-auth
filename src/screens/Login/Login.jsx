import React from 'react'

const Login = () => {
  return (
    <div>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>
      <div>
        <button type="submit" onClick={()=>{}}>Login</button>
      </div>
    </div>
  )
}

export default Login