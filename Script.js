let currentMusic = 0;

const music = document.querySelector('#audio');
const seekbar = document.querySelector('.seek-bar');
const songName = document.querySelector('.title');
const disk = document.querySelector('.disc');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play');
const forwardBtn = document.querySelector('.next');
const backwardBtn = document.querySelector('.prev');

// toggle handler
playBtn.addEventListener("click", () => {
    const toggle = playBtn.classList.value;
    playBtn.classList.toggle('pause')
    disk.classList.toggle('rotate')
    if (toggle == 'play pause') {
        document.getElementById('playImg').src = './Images/pause.svg'
        music.play();
    } else {
        document.getElementById('playImg').src = './Images/play.svg'
        music.pause();
    }
})

// set Music
const setMusic = (i) => {
    seekbar.value = 0; // set range slide value to 0.
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;
    songName.innerHTML = song.name;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekbar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
}

setMusic(0);

// formatting time in min and seconds format

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }

    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

// seekbar 
setInterval(() => {
    seekbar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime)
    if(Math.floor(music.currentTime) == Math.floor(seekbar.max)) {
        forwardBtn.click();
    }
}, 500)

seekbar.addEventListener('change', () => {
    music.currentTime = seekbar.value;
})

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('rotate')
}

// forward and backward function

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
});