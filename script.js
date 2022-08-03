    const music = document.querySelector('audio');
    const play = document.querySelector('.fa-circle-play');
    const prev = document.querySelector('.fa-backward-step');
    const next = document.querySelector('.fa-forward-step');
    const repeat = document.querySelector('.fa-repeat');
    const shuffle = document.querySelector('.fa-shuffle');
    const trackname = document.querySelector('.track-name');
    const trackartist = document.querySelector('.track-artist');
    const trackimage = document.querySelector('.track-art');
    const progress = document.querySelector('.progress');
    let current_time = document.querySelector('.current-time');
    const total_duration = document.querySelector('.total-duration');
    let isPlaying = false;
    let isRandom = false;

    const playMusic = () => {
        isPlaying = true;
        music.play();
        play.classList.replace('fa-circle-play', 'fa-circle-pause');
    }

    const pauseMusic = () => {
        isPlaying = false;
        music.pause();
        play.classList.replace('fa-circle-pause', 'fa-circle-play');
    }

    play.addEventListener("click", () => {
        isPlaying ? pauseMusic() : playMusic();
    })

    const songs = [
        {
            title: "Alag Aasmaan",
            artist: "Anuv Jain",
            image: "alag_aasmaan"
        },
        {
            title: "Baarishien",
            artist: "Anuv Jain",
            image: "baarishein"
        },
        {
            title: "Dil Kyun Yeh Mera",
            artist: "K.K.",
            image: "dil_kyun_ye_mera"
        },
        {
            title: "Dildaara",
            artist: "Vishal Dadlani, Shekhar Ravjiani",
            image: "dildaara"
        },
        {
            title: "Hardum Humdum",
            artist: "Arijit Singh",
            image: "hardum_humdum"
        },
        {
            title: "Perfect",
            artist: "Ed Sheeran",
            image: "perfect"
        },
        {
            title: "Mast Magan",
            artist: "Arijit Singh, Chinmayi Sripada",
            image: "mast_magan"
        },
        {
            title: "Phir Le Aya Dil",
            artist: "Arijit Singh",
            image: "phir_le_aya_dil"
        },
        {
            title: "Safarnama",
            artist: "Lucky Ali",
            image: "safarnama"
        },
        {
            title: "Tum Ho",
            artist: "Mohit Chauhan",
            image: "tum_ho"
        },
        {
            title: "Tum Se Hi",
            artist: "Mohit Chauhan",
            image: "tum_se_hi"
        },
        {
            title: "Tere Naina",
            artist: "Shafqat Amanat Ali",
            image: "tere_naina"
        },
        {
            title: "Saiyaan",
            artist: "Kailash Kher",
            image: "saiyaan"
        },
        {
            title: "Main Jahaan Rahoon",
            artist: "Rahan Fateh Ali Khan",
            image: "main_jahaan_rahoon"
        },
        {
            title: "Kyon",
            artist: "Papon",
            image: "kyon"
        },
        {
            title: "Tum Tak",
            artist: "A.R.Rahman, Javed Ali",
            image: "tum_tak"
        },
        {
            title: "Voh Dekhnay Mein",
            artist: "Ali Zafar",
            image: "voh_dekhnay_mein"
        },
        {
            title: "You",
            artist: "Armaan Malik",
            image: "you"
        },
        {
            title: "Saawali Si Raat",
            artist: "Arijit Singh",
            image: "saawali_si_raat"
        }
    ]

    const loadSong = (songs) => {
        trackname.textContent = songs.title;
        trackartist.textContent = songs.artist;
        music.src = "songs/"+ songs.title +".mp3";
        trackimage.src = "images/"+ songs.image + ".jpg";
    }

    songIndex = 0;

    const prevTrack = () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songs[songIndex]);
        playMusic();
    }

    const nextTrack = () => {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songs[songIndex]);  
        playMusic();
    }

    const repeatTrack = () => {
        let currentIndex = songIndex;
        loadSong(songs[currentIndex]);
        playMusic();
    }

    const randomTrack = () => {
        let randomIndex = Math.floor((Math.random()*songs.length) + 1);
        loadSong(songs[randomIndex]);
        playMusic();
    }


    music.addEventListener("timeupdate", (e) => {
        // console.log(e);
        const { currentTime, duration } = e.srcElement;
        let progress_time = (currentTime / duration) * 100;
        progress.value = `${progress_time}`;

        // Total Duration of Song
        let min_duration = Math.floor(duration / 60);
        let sec_duration = Math.floor(duration % 60);
        if (sec_duration < 10) {
            sec_duration = `0${sec_duration}`
        }
        if (duration) {
            total_duration.textContent = `${min_duration}:${sec_duration}`;
        }

        // Current Time of Song
        let min_currentTime = Math.floor(currentTime / 60);
        let sec_currentTime = Math.floor(currentTime % 60);
        if (sec_currentTime < 10) {
            sec_currentTime = `0${sec_currentTime}`;
        }

        current_time.textContent = `${min_currentTime}:${sec_currentTime}`;

    });

    progress.addEventListener('click', (e) => {
        // console.log(e);
        const { duration } = music;
        let curr_progress = (e.offsetX / e.srcElement.clientWidth) * duration; 
        music.currentTime = curr_progress;
    });


    music.addEventListener('ended', nextTrack);
    prev.addEventListener('click', prevTrack);
    next.addEventListener('click', nextTrack);
    repeat.addEventListener('click', repeatTrack);
    shuffle.addEventListener('click', randomTrack);