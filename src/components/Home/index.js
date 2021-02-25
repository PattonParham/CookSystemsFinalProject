import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getConfigLoading, getGenres, getSelectedGenre, loadGenres, selectGenre } from '../../ducks/config.duck'
import { getAuthLoading, loadToken } from '../../ducks/auth.duck'
import {useState} from 'react';
import {Component} from "react";
// import fetchFromSpotify from '../../services/api';

import axios from 'axios';
import './home.css'



const Home = () => {
  const dispatch = useDispatch()
  const genres = useSelector(getGenres)
  const selectedGenre = useSelector(getSelectedGenre)
  const authLoading = useSelector(getAuthLoading)
  const configLoading = useSelector(getConfigLoading)

let genre = null;
let answer = null;
let userInput = null;
let randomTrackArtist = null;
let randomTrackPreview = null;
let randomTrack = null;


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
        'Authorization' : 'Bearer ' + 'BQC9KEeIh8uQK2jHOTvKsUNGqYunkYuKl3U4LlCexFIUgt5beNi_1nXVgNH3R6uLmAEQJ9w3WOF4M7G0LC8',
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
  randomTrack = data.tracks.items[randomIndex].track;
  console.log(randomTrack);
  randomTrackArtist = data.tracks.items[randomIndex].track.artists[0].name
  randomTrackPreview = data.tracks.items[randomIndex].track.preview_url
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
  document.getElementById("question").style.display = "block";


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
  genre = "3ObJ6Qra3CkV0gNCRTtK0c?si=c9d8162095c5403f"
  console.log(genre);
  CallPlayListData();
}

function classicSet() {
  genre = "6wObnEPQ63a4kei1sEcMdH?si=03461d85bde8492a"
  console.log(genre);
  CallPlayListData();
}

function compare() {
   event.preventDefault();
  if (userInput == randomTrackArtist) {
    console.log("you win");
    document.getElementById("win").style.display = "block";
  }else{
    console.log("You lose");
    document.getElementById("lose").style.display = "block";
  }
}

const store = (event) => {
  userInput = event.target.value
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
      <form id="question" onSubmit={compare}>
        <h3> Who is the artist? </h3>
        <input name="artist" type="text" placeholder="Artist's name" onChange={store}/>
        <button>Compare Answers</button>
      </form>
      <div id="win">
        <h1> You Win!!!! </h1>
      </div>
      <div id="lose">
        <h1> You Lose </h1>
      </div>
    </div>
  )
}

export default Home
