import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom';

const UrlList = () => {
  const [urls, setUrls] = useState(null);
  const makeApiCall = async (url,method) => {
     const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json(); 
  }

  const getAllUrls = async () => {
    const data = await makeApiCall('http://localhost:4000/api/allUrl', 'GET');
    setUrls(data.urls)
  }

  useEffect(() => {
    getAllUrls()
  }, [])

  return (
    <div>
      <h1> Url Shortner</h1>
      <div className="url-list--info">
        <h3>All Urls</h3>
        <Link to="/">Shorten New Url</Link>
      </div>
      <table>
        <thead >
          <th>Long Url</th>
          <th>Short Url</th>
          <th>Expiry Date</th>
        </thead>
      {
        urls && urls.map((url)=> {
          return (
              <tr key={url.shortUrlId}>
                <td> <a href={url.longUrl}> {url.longUrl} </a> </td>
                <td> <a href={url.shortUrl}> {url.shortUrl} </a>  </td>
                <td> {url.expiryDate} </td>
              </tr>
          )
        })
      }
       </table>
    </div>
  )
}

export default UrlList
