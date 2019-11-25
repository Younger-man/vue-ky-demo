import 'soundmanager2';

// eslint-disable-next-line no-unused-vars
const { SoundManager, soundManager } = window;

window.SoundManager = undefined;
window.soundManager = undefined;

soundManager.setup({
  useHTML5Audio: true,
  debugMode: false,
  ontimeout() {
    soundManager.reboot();
  },
});

let singleInstance;

function Player() {
  if (singleInstance) {
    return singleInstance;
  }
  if (!(this instanceof Player)) {
    return new Player();
  }
  this.smSound = null;
  this.position = 0;
  this.playState = Player.OFF;
  singleInstance = this;
  window.test = singleInstance;
}

// 播放状态常量
Player.OFF = 0;
Player.LOADING = 1;
Player.PLAYING = 2;
Player.PAUSING = 3;
Player.FINISH = 4;
Player.ERROR = -1;

// eslint-disable-next-line no-underscore-dangle
Player.prototype._createSound = function _createSound({ id, url }) {
  return soundManager.createSound({
    id,
    url,
    autoPlay: true,
    onload: () => {
      // console.log('onload');
      this.playState = Player.LOADING;
    },
    onplay: () => {
      // console.log('onplay');
      this.playState = Player.LOADING;
    },
    // whileloading: () => {
    //   //console.log('whileloading');
    //   this.playState = Player.LOADING;
    // },
    onbufferchange: () => {
      // console.log('onbufferchange');
      if (this.isBuffering) {
        this.playState = Player.LOADING;
      }
    },
    whileplaying: () => {
      // console.log('whileplaying');
      this.playState = Player.PLAYING;
    },
    onpause: () => {
      // console.log('onpause');
      this.playState = Player.PAUSING;
      // console.log(this.playState);
    },
    onfinish: () => {
      // console.log('onfinish');
      this.playState = Player.FINISH;
    },
    onstop: () => {
      // console.log('onstop');
      this.playState = Player.FINISH;
    },
    onerror: () => {
      // console.log('onerror');
      this.playState = Player.ERROR;
    },
  });
};

Player.prototype.toggle = function toggle({ id, url }) {
  if (this.smSound) {
    if (this.smSound.id === id && this.playState !== Player.ERROR) {
      if (this.playState === Player.PLAYING) {
        this.pause();
      } else {
        this.play();
      }
      return this;
    }
    soundManager.destroySound(this.smSound.id);
  }
  // eslint-disable-next-line no-underscore-dangle
  this.smSound = this._createSound({ id, url });
  return this;
};

Player.prototype.play = function play() {
  if (this.smSound) {
    this.smSound.play();
    this.playState = Player.LOADING;
  }
  return this;
};

Player.prototype.pause = function pause() {
  if (this.smSound) {
    this.smSound.pause();
    this.playState = Player.PAUSING;
  }
  return this;
};

export default Player;
