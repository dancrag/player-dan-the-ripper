const tracks = [
  {
    id: '1',
    trackName: 'I Dance To The Jazz Of The 50s',
    author: 'Aurbanni Audio',
    genre: 'Jazz',
    path: './assets/music/AurbanniAudio-IDanceToTheJazzOfThe50s.mp3',
    imgSrc: 'https://images.pexels.com/photos/5022847/pexels-photo-5022847.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: '2',
    trackName: 'Igor Pumphonia feat. EVVA Music Passion',
    author: 'Igor Pumphonia',
    genre: 'Electronic',
    path: './assets/music/IgorPumphonia-IgorPumphoniaFeatEVVAMusic-Passion.mp3',
    imgSrc: 'https://images.pexels.com/photos/5091507/pexels-photo-5091507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: '3',
    trackName: 'You and Me',
    author: 'JekK',
    genre: 'Electronic',
    path: './assets/music/JekK-YouAndMe.mp3',
    imgSrc: 'https://images.pexels.com/photos/2268509/pexels-photo-2268509.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
  },
  {
    id: '4',
    trackName: 'Fashion City',
    author: 'Mat Fix',
    genre: 'Blues',
    path: './assets/music/MatFix-FashionCity.mp3',
    imgSrc: 'https://images.pexels.com/photos/3607053/pexels-photo-3607053.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
  },
  {
    id: '5',
    trackName: 'A Night on the Town',
    author: 'Stefan Kartenberg',
    genre: 'Jazz',
    path: './assets/music/StefanKartenberg-ANightOnTheTown.mp3',
    imgSrc: 'https://images.pexels.com/photos/2268519/pexels-photo-2268519.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  }
]

let currentTrack;
const audios = document.getElementsByTagName('audio')
const currentTrackImg = document.getElementById('currentTrackImg')
const currentTrackName = document.getElementById('currentTrackName')
const currentTrackDuration = document.getElementById('currentTrackDuration')
const currentTrackTime = document.getElementById('currentTrackTime')
const timeline = document.getElementById('timeline')
const pausePlay = document.getElementById('pause-play')
const play = document.getElementById('play')
const pause = document.getElementById('pause')
const next = document.getElementById('next')
const prev = document.getElementById('prev')

//Initialize the DOM
function initialize() {
  for (const track of audios) if (track.id === "1") currentTrack = track;
  setTimeout(() => {
    setValues(currentTrack.id)
  }, 50)
}
initialize()

//Event listeners added when a new track is present
function newCurrentTrack() {

  //Update the value of timeline and the current time of the track
  currentTrack.addEventListener('timeupdate', () => {
    timeline.value = currentTrack.currentTime
    currentTrackTime.innerText = toTime(currentTrack.currentTime)
  })
  
    //On audio ends
  currentTrack.addEventListener('ended', () => {
    pause.setAttribute('display', 'none')
    play.setAttribute('display', 'block')
    nextFunction()
  })

  //On audio playing
  currentTrack.addEventListener('playing', () => {
    pause.setAttribute('display', 'block')
    play.setAttribute('display', 'none')
  })
}

//Change the current time of audio according with the value of the range
timeline.addEventListener('input', () => {
  currentTrack.currentTime = timeline.value
})

//On next click
next.addEventListener('click', nextFunction)
function nextFunction() {
  currentTrack.pause()
  currentTrack.currentTime = 0
  for (const track of audios) {
    if (track.id === String(Number(currentTrack.id) + 1)) {
      currentTrack = track
      break
    }
  }
  setTimeout(() => {
    setValues(currentTrack.id)
  }, 50)
  currentTrack.play()
  pause.setAttribute('display', 'block')
  play.setAttribute('display', 'none')
}

//On prev click
prev.addEventListener('click', prevFunction)
function prevFunction() {
  currentTrack.pause()
  currentTrack.currentTime = 0
  for (const track of audios) {
    if (track.id === String(Number(currentTrack.id) - 1)) {
      currentTrack = track
      break
    }
  }
  setTimeout(() => {
    setValues(currentTrack.id)
  }, 50)
  currentTrack.play()
  pause.setAttribute('display', 'block')
  play.setAttribute('display', 'none')
}

//On play or pause click
pausePlay.addEventListener('click', () => {
    if (play.getAttribute('display') === 'none') {
    pause.setAttribute('display', 'none')
    play.setAttribute('display', 'block')
    currentTrack.pause()
  } else {
    play.setAttribute('display', 'none')
    pause.setAttribute('display', 'block')
    currentTrack.play()
  }
})

//Setting values in DOM
function setValues(id) {
  const track = tracks.find((track) => track.id === id)
  currentTrackImg.setAttribute('src', track.imgSrc)
  timeline.setAttribute('max', currentTrack.duration)
  timeline.value = 0;
  currentTrackName.innerText = track.author + ' - ' + track.trackName
  currentTrackDuration.innerText = toTime(currentTrack.duration)
  currentTrackTime.innerText = toTime(0)
  newCurrentTrack();
}

//Convert seconds to time
function toTime(seconds) {
  minutes = Math.floor(seconds / 60, 0)
  seconds = Math.floor(seconds - (minutes * 60), 0)

  return ( minutes <= 9 ? '0' + minutes: minutes ) + ':' + (seconds <= 9 ? '0' + seconds: seconds )
}
