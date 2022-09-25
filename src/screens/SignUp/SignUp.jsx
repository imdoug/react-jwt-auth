import React from 'react'

const SignUp = () => {
  return (
    <div>
      <div>
        <h2>Sign Up</h2>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required />
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
        <label htmlFor="confPassword">Confirm Password</label>
        <input type="password" name="re-password" id="confPassword" required />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <select name="role" id="role">
          <option value="x"></option>
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </div>
      <div>
        <button type="submit" onClick={()=>{}}>Login</button>
      </div>
    </div>
  )
}

export default SignUp