import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getConfigLoading, getGenres, getSelectedGenre, loadGenres, selectGenre } from '../../ducks/config.duck'
import { getAuthLoading, loadToken } from '../../ducks/auth.duck'
import {useState} from 'react';
import {Component} from "react";
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
        'Authorization' : 'Bearer ' + 'BQCJrepGWQC83H8GoVVb5ivEofzFisVN1N0qNvXL0Dsp5iJ1vmAErfZc2a3vJG3HzTj5lzkdMB_fna0ZT-s',
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
  })
  

  let arrayLength = data.tracks.items.length
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let randomIndex = getRandomInt(arrayLength + 1)
  
  console.log(randomIndex);
  let randomTrack = data.tracks.items[randomIndex].track;
  console.log(randomTrack);
  let randomTrackArtist = data.tracks.items[randomIndex].track.artists[0].name
  let randomTrackPreview = data.tracks.items[randomIndex].track.preview_url
  if (randomTrackPreview === null){
    CallPlayListData();
  }
 
  console.log(randomIndex, randomTrackArtist, randomTrackPreview);



  console.log("Hey I have been hit, lol")
  console.log(data);
  console.log(data.tracks);
  console.log(data.tracks.items[0].track.name);
  console.log(data.tracks.items[0].track.artists[0].name);
  console.log(data.tracks.items[0].track.preview_url);
  console.log(arrayLength);


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
