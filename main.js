// var songs = [
//   { title: 'Photograph', artist: 'Edd Sheeran', path: 'public/music/Photograph.mp3', cover: 'public/img/poster-photograph.jpg' },
//   { title: 'Starboy', artist: 'The Weekend', path: 'public/music/Starboy.mp3', cover: 'public/img/poster-starboy.jpg' },
//   { title: 'Stressed Out', artist: 'Twenty One Pilots', path: 'public/music/Stressed-Out.mp3', cover: 'public/img/poster-stressed.out.jpg' },
//   { title: 'Con Calma', artist: 'Daddy Yanke', path: 'public/music/Con-Calma.mp3', cover: 'public/img/poster-con.calma.jpg' },
//   { title: 'B.Y.O.B', artist: 'System of a Down', path: 'public/music/BYOB.mp3', cover: 'public/img/poster-B.Y.O.B.jpg' },
//   { title: 'Come and Get Your Love', artist: 'Redbone', path: 'public/music/Come-and-Get-Your-Love.mp3', cover: 'public/img/poster-redbone.jpg' },
//   { title: 'Callaita', artist: 'Bad Bunny', path: 'public/music/Callaita.mp3', cover: 'public/img/poster-callaita.jpg' },
//   { title: 'New Rules', artist: 'Dua Lipa', path: 'public/music/New-Rules.mp3', cover: 'public/img/poster-new.rules.jpg' }
// ];

const createComponentSong =  (song, evento) => {
  const component = document.createElement('li')
  component.addEventListener('click', evento)
  component.innerHTML = `
      <img src="${song.path.front}" alt="Portada">
          <div class="song-info">
            <h3>${song.title}</h3>
            <p>${song.author}</p>
          </div>
  `
  return component
}

fetch('https://leonardoapi.onrender.com/music')
  .then(res => res.json())
  .then( songs => {

    
    const container = document.getElementById('song-list-api')

    songs.map(song => {
      container.appendChild(createComponentSong(song, () => {
        loadSong(song)
      }))

      document.getElementById("play").addEventListener("click", () => {
        togglePlay()
      })

    

    })
    
    var currentSongIndex = 0;
    var audioPlayer = new Audio();

    
    function loadSong(song) {
      audioPlayer.src = song.path.audio;
      audioPlayer.load();
      togglePlay();
      updateSongInfo(song.author,song.title, song.path.front);
      
    }
    
    function togglePlay() {
      if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('play').textContent = '⏸';
      } else {
        audioPlayer.pause();
        document.getElementById('play').textContent = '▶';
      }
    }
    
    
    function updateProgressBar() {
      var progressBar = document.getElementById('progress-bar');
      var currentTime = document.getElementById('current-time');
      var duration = document.getElementById('duration');
      
      progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      currentTime.textContent = formatTime(audioPlayer.currentTime);
      duration.textContent = formatTime(audioPlayer.duration);
    }
    
    function seekSong() {
      var progressBar = document.getElementById('progress-bar');
      audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }
    
    function formatTime(time) {
      var minutes = Math.floor(time / 60);
      var seconds = Math.floor(time % 60);
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
    
    function updateSongInfo(artist,title, cover) {
      var coverArt = document.getElementById('cover-art');
      var songInfo = document.getElementById('song-info');
      
      coverArt.style.backgroundImage = 'url(' + cover + ')';
      songInfo.innerHTML = '<h3>' + title + '</h3><p>' + artist + '</p>';
    }
    
    audioPlayer.addEventListener('timeupdate', updateProgressBar);
  })
  







