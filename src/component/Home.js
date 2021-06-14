import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  const [longUrl, setLongUrl] = useState('');
  const [expiryDate, setExpiryDate] = useState('')
  const [shortUrl, setShortUrl] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [showExpiryDate, setShowExpiryDate] = useState(false);
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [error, setError] = useState('');

  
  const resetExpiryDateAndUserPassword = ()=> {
    setExpiryDate('');
    setUser('');
    setPassword('');
    setShowExpiryDate(false);
    setShowUserPassword(false);
  }
  const createNewUrl = async () => {
    const payload = {
      longUrl
    };
    if(expiryDate) {
      payload.expiryDate = expiryDate;
    }
    if(user && password) {
      payload.user = user;
      payload.password = password;
    }
    resetExpiryDateAndUserPassword();
     return await fetch('http://localhost:4000/api/shortenUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((response) => {
      // 1. check response.ok
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response); // 2. reject instead of throw
    })
    .then((data) => {
      setShortUrl(data.shortUrl)
    })
    .catch((response) => {
      // 3. get error messages, if any
      response.json().then((e) => {
        setError(e.error.errorMessage)
      })
    });
  }

  return (
    <div>
      <h1>Url Shortner</h1>
      <div className="homepage-container">
        {error && <p className="error-text"> {error} </p> }
        <input type="text"  placeholder="url" value={longUrl} onChange={(event) =>{ setLongUrl(event.target.value);setError('')}} required />
        <div className="checkbox-container">
          <input type="checkbox" name="" checked={showExpiryDate} id="expirydate" onChange={()=> setShowExpiryDate(!showExpiryDate)} />
          <label htmlFor="expirydate">Configure expiry date and time</label>
        </div>
      { showExpiryDate && <input type="datetime-local" onChange={(event)=> {
          setExpiryDate(event.target.value)
        }} />}
        <div className="checkbox-container">
          <input type="checkbox" name=""  checked={showUserPassword}  id="userPassword" onChange={()=> setShowUserPassword(!showUserPassword)}  />
          <label htmlFor="userPassword">Make short url password protected</label>
        </div>
        {showUserPassword && <input type="text" placeholder="user" value={user} onChange={(event)=>{
          setUser(event.target.value)
        }}/>}
      { showUserPassword && <input type="text"  placeholder="password" value={password} onChange={(event)=>{
          setPassword(event.target.value)
        }}/>}
        <input type="submit" onClick={()=> createNewUrl()} value="Submit"/>
        <Link to="/url-list">All Urls </Link>
      </div>
    { shortUrl &&  <div>
        <p>Long Url: <a href={longUrl}> {longUrl}</a> </p> 
        <p>  Short Url: <a href={shortUrl}> {shortUrl}</a></p>
      </div>}
  </div>
  )
}

export default Home
