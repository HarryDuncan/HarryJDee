export function handleProgress() {
  if (this.seekingInterval) {
    clearInterval(this.seekingInterval);
  }
  if (this.audioRef) {
    this.seekingInterval = setInterval(() => {
      if (this.audioRef) {
        this.setTime();
        const currentAudioTime =
          this.audioRef.currentTime / this.audioRef.duration * 100;
        this.setState({
          seekerVal: currentAudioTime.toString()
        });
      }
    }, 500);
  }
}

export function handleSeekSlider(newVal) {
  let seekTo = this.audioRef.duration * (newVal/ 100);
  clearInterval(this.seekingInterval);
  this.setTime(seekTo);
  this.setState({
    seekerVal: `${newVal}`
  });
}

export function handleSeek(event , newVal) {
  let seekTo = this.audioRef.duration * (newVal / 100);
  this.audioRef.currentTime = seekTo;
  if (this.state.playing) {
    this.handleProgress();
  }
}


export function setTime(seekTo) {
  if (this.audioRef){
  let time;
  if (seekTo || seekTo === 0) {
    time = seekTo;
  } else {
    time = this.audioRef.currentTime;
  }
  let currentAudioTime = this.secondsToClock(time);
  this.setState({currentAudioTime});    
  }
}

export function secondsToClock(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return `${minutes}:${seconds}`;
}

export function loadDuration() {
  let duration = this.secondsToClock(this.audioRef.duration);
  this.setState({duration})
}