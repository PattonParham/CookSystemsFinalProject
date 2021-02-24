import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getConfigLoading, getGenres, getSelectedGenre, loadGenres, selectGenre } from '../../ducks/config.duck'
import { getAuthLoading, loadToken } from '../../ducks/auth.duck'
// import fetchFromSpotify from '../../services/api';

import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch()
  const genres = useSelector(getGenres)
  const selectedGenre = useSelector(getSelectedGenre)
  const authLoading = useSelector(getAuthLoading)
  const configLoading = useSelector(getConfigLoading)


  useEffect(() => {
    Promise.resolve(dispatch(loadToken()))
      .then(({ payload: { value } }) => {
        dispatch(loadGenres(value))
      })
  }, [])

  // our code somewhere in this file
const CallPlayListData = async() => {
  console.log("axios was hit")      
  let {data} =  await axios.get('https://api.spotify.com/v1/playlists/0yF4TySR6PfVHR0u1oIcWT?si=43c62216fbb847eb',{
    headers: {
        'Authorization' : 'Bearer ' + 'BQDdAxT5OXxF_6WX9GfOQh73lzbhY3qwyRbfLGo9hvT_9-heCv_EQ-yb2LNA59eaNkKPzuo2pj2XX3vkOSc',
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
  })

  console.log("Hey I have been hit, lol")
  console.log(data);
  console.log(data.tracks);
  console.log(data.tracks.items[0].track.name);
}

CallPlayListData();
  
  
  //switch statement with b

//   fetchFromSpotify('BQAu9OK6vqMDbHxPpChnsA-EwDD0t2wUxdnmeF-ZzIO5VjGP6YLB_3Ifznyp2fDYjtPKRrWzp5a4JixxwCI', 
//  'playlists/0yF4TySR6PfVHR0u1oIcWT?si=43c62216fbb847eb');

//  console.log(fetchFromSpotify('BQAu9OK6vqMDbHxPpChnsA-EwDD0t2wUxdnmeF-ZzIO5VjGP6YLB_3Ifznyp2fDYjtPKRrWzp5a4JixxwCI', 'playlists/0yF4TySR6PfVHR0u1oIcWT?si=43c62216fbb847eb'));





  if (authLoading || configLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      Genre:
      <select
        value={selectedGenre}
        onChange={(event) => dispatch(selectGenre(event.target.value))}>
        <option value=''/>
        {genres.map(genre => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Home
