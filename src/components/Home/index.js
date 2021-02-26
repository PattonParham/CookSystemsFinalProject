import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getConfigLoading, getGenres, getSelectedGenre, loadGenres, selectGenre } from '../../ducks/config.duck'
import { getAuthLoading, loadToken } from '../../ducks/auth.duck'
import {useState} from 'react';
import {Component} from "react";
// import fetchFromSpotify from '../../services/api';
import ReactAudioPlayer from 'react-audio-player';
import {Howl, Howler} from 'howler';
import token from '../../ducks/auth.duck/token.duck';
import axios from 'axios';
import './home.css'



const Home = () => {
  const dispatch = useDispatch()
  const genres = useSelector(getGenres)
  const selectedGenre = useSelector(getSelectedGenre)
  const authLoading = useSelector(getAuthLoading)
  const configLoading = useSelector(getConfigLoading)



let genre = null;

let srcInput = document.getElementsByClassName("srcInput");
let answer = null;
let userInput = null;
let randomTrackArtist = null;
let randomTrackPreview = null;
let sound = null;



  useEffect(() => {
    Promise.resolve(dispatch(loadToken()))
      .then(({ payload: { value } }) => {
        dispatch(loadGenres(value))
        console.log(value);
      })
  }, [])


// const [randomSong, updateRandomSong] = useState('');

// const onChange = (event) => {
//   updateRandomSong(event.target.value)

// }
// let accessToken;
// const Access = async() => {

//   accessToken = await axios.get('https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token')
//   .then(res =>  {accessToken = res.data.access_token});
// }

// Access();
// console.log(accessToken);


 
  


  // our code somewhere in this file
const CallPlayListData = async() => {

  let {data} =  await axios.get('https://api.spotify.com/v1/playlists/' + genre,{

    headers: {
        'Authorization' : 'Bearer ' + 'BQCoIBmCdvAGgZ3fPfE7GsWrdZt2D154TqyY_EWcA9lYCupp-vv34yy2NltcufSO9G-9vhHwvKqovDXZUM8',
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
  })


  let arrayLength = data.tracks.items.length
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  let randomIndex = getRandomInt(arrayLength + 1)

  let randomTrack = data.tracks.items[randomIndex].track;
  randomTrackArtist = data.tracks.items[randomIndex].track.artists[0].name
  randomTrackPreview = data.tracks.items[randomIndex].track.preview_url


  if (randomTrackPreview === null){
    CallPlayListData();
  } else {
    console.log(randomTrack);
    console.log(randomIndex, randomTrackArtist, randomTrackPreview);
    console.log(randomTrackPreview);
    console.log("only non null previews are logging")
  }

  


  sound = new Howl({
    src: [randomTrackPreview],
    format: ['ogg'],
    autoplay: true,
    volume: 0.5,
    onend: function() {
      console.log('Finished!');
    }
  });

  document.getElementById("question").style.display = "block";

  sound.play();
}





function rockSet() {
  genre = "37i9dQZF1DWXRqgorJj26U?si=0799a15f7d834486";
  console.log(genre);
  CallPlayListData();
  document.getElementById("lose").style.display = "none";
  document.getElementById("win").style.display = "none";
  document.getElementById('artist').value = '';
  stopBtn()
}
function rapSet() {
  genre = "0yF4TySR6PfVHR0u1oIcWT?si=43c62216fbb847eb"
  console.log(genre);
  CallPlayListData();
  document.getElementById("lose").style.display = "none";
  document.getElementById("win").style.display = "none";
  document.getElementById('artist').value = '';
  stopBtn();
}
function dubSet() {
  genre = "3ObJ6Qra3CkV0gNCRTtK0c?si=c9d8162095c5403f"
  console.log(genre);
  CallPlayListData();
  document.getElementById("lose").style.display = "none";
  document.getElementById("win").style.display = "none";
  document.getElementById('artist').value = '';
  stopBtn();
}
function classicSet() {
  genre = "6wObnEPQ63a4kei1sEcMdH?si=03461d85bde8492a"
  console.log(genre);
  CallPlayListData();
  document.getElementById("lose").style.display = "none";
  document.getElementById("win").style.display = "none";
  document.getElementById('artist').value = '';
  stopBtn();
}

function pauseBtn(){
  sound.pause();
}
function playBtn(){
  sound.play();
}
function stopBtn(){
  sound.stop();
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
    <div className="gameCard">
      <div>
        <div id = "btnInstruction">
        Select a genre:
        </div>
        <div>
          <button className="genreBtn" id ="rockBtn" onClick={rockSet}>Rock </button>
          <button className="genreBtn" id ="rapBtn"  onClick={rapSet}>Rap </button>
        </div>
        <div>
          <button className="genreBtn" id ="dubBtn" onClick={dubSet}>Dubstep </button>
          <button className="genreBtn" id="classicBtn" onClick={classicSet}>Classical </button>
        </div>
      </div>
      <div className="transport">
     <button id="playBtn" onClick={playBtn}></button>
     <button id="pauseBtn" onClick={pauseBtn}></button>
     <button id="stopBtn" onClick={stopBtn}></button>
     </div>
      <form id="question" onSubmit={compare}>
        <h3 id="formHead"> Who is the artist? </h3>
        <div>
        <input id="artist" type="text" placeholder="Artist's name" onChange={store}/>
        </div>
        <div>
        <button id="compareBtn">Compare Answers</button>
        </div>
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