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

let genre = null;


  useEffect(() => {
    Promise.resolve(dispatch(loadToken()))
      .then(({ payload: { value } }) => {
        dispatch(loadGenres(value))
      })
  }, [])

  // our code somewhere in this file
const CallPlayListData = async() => {
  console.log("axios was hit")
  let {data} =  await axios.get('https://api.spotify.com/v1/playlists/' + genre,{
    headers: {
        'Authorization' : 'Bearer ' + 'BQCJrepGWQC83H8GoVVb5ivEofzFisVN1N0qNvXL0Dsp5iJ1vmAErfZc2a3vJG3HzTj5lzkdMB_fna0ZT-s',
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
  })

  console.log("Hey I have been hit, lol")
  console.log(data);
  console.log(data.tracks);
  console.log(data.tracks.items[0].track.name);
}



  //switch statement with b

//   fetchFromSpotify('BQAu9OK6vqMDbHxPpChnsA-EwDD0t2wUxdnmeF-ZzIO5VjGP6YLB_3Ifznyp2fDYjtPKRrWzp5a4JixxwCI',
//  'playlists/0yF4TySR6PfVHR0u1oIcWT?si=43c62216fbb847eb');

//  console.log(fetchFromSpotify('BQAu9OK6vqMDbHxPpChnsA-EwDD0t2wUxdnmeF-ZzIO5VjGP6YLB_3Ifznyp2fDYjtPKRrWzp5a4JixxwCI', 'playlists/0yF4TySR6PfVHR0u1oIcWT?si=43c62216fbb847eb'));


function rockSet() {
  genre = "37i9dQZF1DWXRqgorJj26U?si=0799a15f7d834486";
  console.log(genre);
  CallPlayListData();
}

function rapSet() {
  genre = "0yF4TySR6PfVHR0u1oIcWT?si=43c62216fbb847eb"
  console.log(genre);
  CallPlayListData();
}

function dubSet() {
  genre = "79GdJAzRndi9pBpP5WSHWv?si=9ox7t9W-QtO1rtJKIBVVOw"
  console.log(genre);
  CallPlayListData();
}

function classicSet() {
  genre = "6wObnEPQ63a4kei1sEcMdH?si=03461d85bde8492a"
  console.log(genre);
  CallPlayListData();
}


  if (authLoading || configLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      Select a genre:
      <button onClick={rockSet}>Rock </button>
      <button onClick={rapSet}>Rap </button>
      <button onClick={dubSet}>Dubstep </button>
      <button onClick={classicSet}>Classical </button>
    </div>
  )
}

export default Home
