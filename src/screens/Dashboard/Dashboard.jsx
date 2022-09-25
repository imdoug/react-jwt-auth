import React from 'react'


const Dashboard = () => {
  return (
    <div>
      <div>
        <h2>Welcome "NAME"</h2>
      </div>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
          <button>Change Name</button>
        </div>
        <div>
          <button type='submit' onClick={()=>{}}>Log Out</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard