const music_list = [{
    title: "_Kaise_Mujhe__Ghajini_",
    artist: "A.R._Rahman",
    Image: "jacinto-1"
}, {
    title: "_Musafir_Song_",
    artist: "Palash_Muchhal",
    Image: "jacinto-2"
}, {
    title: "_Tum_Hi_Aana_(Sad_Version)_",
    artist: "Jubin_Nautiyal",
    Image: "jacinto-3"
}, {
    title: "_tumi_chole_geco_onek_dure",
    artist: "Unknown",
    Image: "metric-1"
},
{
    title: "Preme_Pora",
    artist: "sreya_ghosal",
    Image: "pic"
}
]



// get the audio element
const audioElement = document.querySelector('#main-audio');
const playButton = document.querySelector("#play")
const image = document.getElementById("image")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const prevButton = document.getElementById("prev")
const nextButton = document.getElementById("next")
const currenttime = document.getElementById("current-time")
const duration = document.getElementById("duration")
const progress = document.getElementById("progress")
const progresscontainer = document.getElementById("progress-container")
const repeatButton = document.getElementById("repeat-plist")
const moremusic = document.getElementById("more-music")
const musiclist = document.getElementById("music-list")
const list = document.getElementById("list")
const closelist = document.getElementById("close")
// set some variable
let isplaying = false
let songIndex = 1
let repeateActive = false
// play song function

// function sec_format(duration) {

//     return `${Math.floor(duration / 60)} : ${Math.floor(duration % 60)} `;

// }
function currentTime() {
    // avoiding the NaN problem
    if (audioElement.duration) {
        let formattedcrntTime = `${Math.floor(audioElement.currentTime / 60)} : ${Math.floor(audioElement.currentTime % 60)} `
        let formattedDrtn = `${Math.floor(audioElement.duration / 60)} : ${Math.floor(audioElement.duration % 60)} `
        currenttime.innerText = formattedcrntTime
        duration.innerText = formattedDrtn
        progress.style.width = `${audioElement.currentTime / audioElement.duration * 100}%`
    }
}
// adding event to audio  
audioElement.addEventListener("timeupdate", currentTime)



// for (let i = 0; i < music_list.length; i++) {
//     let listItem = `<li class="music-list-item" data-index="${i}">
//                         <div class="row">
//                             <span>${music_list[i].title}</span>
//                             <p>${music_list[i].artist}</p>
//                         </div>
//                         <span id="${i}" class="audio-duration">Seconds</span>
//                         <audio class="music-1" id="${i}" src="music/${music_list[i].title}.mp3"></audio>
//                     </li> `
//     console.log(this);
//     list.innerHTML += listItem
// }

// var music_lists = document.querySelectorAll(".music-list-item");
// music_lists.forEach(element => {
//     element.addEventListener("click", (e) => {
//         let m_index = element.getAttribute("data-index");
//         addingSrc(Number(m_index) + 1);
//     });
//     setTimeout(() => {
//         let c_duration = element.childNodes[5].duration;
//         element.childNodes[3].innerText = sec_format(Math.round(c_duration));
//     }, 500);
//     // console.log(element.childNodes);
// });




// // setting title,artist,song source etc
function addingSrc(index) {
    audioElement.src = `music/${music_list[index - 1].title}.mp3`
    artist.innerText = music_list[index - 1].artist
    image.src = `img/${music_list[index - 1].Image}.jpg`
    title.innerText = music_list[index - 1].title


    // music_lists.forEach(element => {
    //     let c_duration = element.childNodes[5].duration;
    //     element.childNodes[3].innerText = sec_format(Math.round(c_duration));
    // })

    // music_lists[index - 1].childNodes[3].innerText = 'Playing';
}



// play song function
async function playSong() {
    playButton.innerText = "pause"
    audioElement.play()
    isplaying = true
}
// pause song function
function pauseSong() {
    playButton.innerText = "play_arrow"
    audioElement.pause()
    isplaying = false
}

// adding event to play button
playButton.addEventListener("click", () => {
    isplaying ? pauseSong() : playSong()
})
// next song function
function nextSong() {
    songIndex >= music_list.length ? songIndex = 1 : songIndex++
    console.log(songIndex);
    addingSrc(songIndex)
    playSong()
}
// prev song function
function prevSong() {
    songIndex <= 1 ? songIndex = music_list.length : songIndex--
    console.log(songIndex);
    addingSrc(songIndex)
    playSong()
}
// adding event to next button
nextButton.addEventListener("click", nextSong)
// // adding event to prev button
prevButton.addEventListener("click", prevSong)

// progress function
function progres(e) {
    audioElement.currentTime = e.offsetX / progresscontainer.clientWidth * audioElement.duration
    progress.style.width = `${(e.offsetX / progresscontainer.clientWidth) * 100}% `
    playSong()
}

// progress bar functioanality
progresscontainer.addEventListener("click", progres)

// repeating song 
function repeate() {
    if (repeateActive) {
        repeatButton.innerText = "repeat"
        audioElement.loop = false
        repeateActive = false
    } else {
        repeatButton.innerText = "repeat_one"
        audioElement.loop = true
        repeateActive = true
    }
}
repeatButton.addEventListener("click", repeate)

// show More music function

function showMoremusic() {
    musiclist.classList.add("show")
}

// adding event to more music button
moremusic.addEventListener("click", showMoremusic)

// close list function
function closeMusiclist() {
    musiclist.classList.remove("show")
}
closelist.addEventListener("click", closeMusiclist)

//default function after window load
function windowLoad() {
    addingSrc(songIndex)
    audioElement.addEventListener("ended", nextSong)
}
// adding event to window
window.addEventListener("load", windowLoad())
