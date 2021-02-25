import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getConfigLoading, getGenres, getSelectedGenre, loadGenres, selectGenre } from '../../ducks/config.duck'
import { getAuthLoading, loadToken } from '../../ducks/auth.duck'
import {useState} from 'react';
import {Component} from "react";
// import fetchFromSpotify from '../../services/api';
import ReactAudioPlayer from 'react-audio-player';
import {Howl, Howler} from 'howler';

import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch()
  const genres = useSelector(getGenres)
  const selectedGenre = useSelector(getSelectedGenre)
  const authLoading = useSelector(getAuthLoading)
  const configLoading = useSelector(getConfigLoading)



let genre = null;
let randomTrackArtist = "";
let randomTrackPreview = "";
let srcInput = document.getElementsByClassName("srcInput");



  useEffect(() => {
    Promise.resolve(dispatch(loadToken()))
      .then(({ payload: { value } }) => {
        dispatch(loadGenres(value))
      })
  }, [])


// const [randomSong, updateRandomSong] = useState('');

// const onChange = (event) => {
//   updateRandomSong(event.target.value)

// }



  // our code somewhere in this file
const CallPlayListData = async() => {

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

  


  var sound = new Howl({
    src: [randomTrackPreview],
    format: ['ogg'],
    autoplay: true,
    volume: 0.5,
    onend: function() {
      console.log('Finished!');
    }
  });


  sound.play();
}



// const [audioObject, setAudioObject] = useState({
//   src: `"${randomTrackPreview}"`
// });



// function handleAudioChange(event) {
//   const { name, value } = event.target;
//   setAudioObject({...audioObject, [name]: value})
// };

// const DummyConstant = () => {
//   return(
//     <div>
//     <audio className ="audioPlayer" src = {randomTrackPreview} autoPlay={true} ></audio>
//     <div>fdhsghfchjsefgchjdsgfhgdshfvdshfgjhdsgfhmdxvhj fuck you</div>

//     </div>
//   )
// }


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

// const useAudio = (url) => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);
//   const toggle = () => setPlaying(!playing);
//   useEffect(() => {
//       playing ? audio.play() : audio.pause();
//     },
//     [playing]
//   );
//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);
//   return [playing, toggle];
// };


// const Player = ({ url }) => {
//   const [playing, toggle] = useAudio(url);
//   return (
//     <div>
//       <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
//     </div>
//   );

// }
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

      {/* <audio autoPlay={true}>
        <source type="audio/ogg" src={randomTrackPreview}/>
      </audio> */}
      {/* <ReactAudioPlayer className ="audioPlayer" src={audioObject.src} autoPlay={true} controls/>
      <input onChange={handleAudioChange} className="srcInput" name="src" value={audioObject.src}></input> */}
      {/* <Player url={randomTrackPreview}></Player> */}
      {/* <DummyConstant></DummyConstant> */}
      

      

    </div>
  )
}

export default Home