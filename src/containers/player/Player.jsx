import React from 'react'
// import { Link } from 'react-router-dom'
import './Player.css'
import ReactPlayer from 'react-player'
// const path = require('path')
// const getColors = require('get-image-colors')

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: true,
      played: 0,
      volume: 0.5,
      repeat: false,
      totalTime: 0,
      activeTime: 0,
    }
  }

  componentWillReceiveProps() {
    if (this.props.music && this.state.playing === false) {
      this.setState({ playing: true })
    }
  }

  onProgress = e => {
    this.setState({ activeTime: this.secondToDate(e.playedSeconds) })
  }

  onDuration = d => {
    this.setState({ totalTime: this.secondToDate(d) })
  }

  secondToDate = (result) => {
    // var h = Math.floor(result / 3600) || 00;
    if (result > 0) {
      let m = Math.floor((result / 60 % 60));
      if (m < 10) {
        m = '0' + m
      }
      let s = Math.floor((result % 60));
      if (s < 10) {
        s = '0' + s
      }
      return result = + m + ':' + s
    }
  }

  onEnded = () => {
    this.props.onNextMusic()
  }

  ref = player => {
    this.player = player
  }
  playOrPauseMusic = () => {
    console.log(this)
    this.setState({ playing: !this.state.playing })
  }
  handlePreviousMusic = () => {
    this.props.onPreviousMusic()
  }
  handleNextMusic = () => {
    this.props.onNextMusic()
  }

  render() {
    const { playing, volume, repeat } = this.state
    return (
      <div className="player">
        <ReactPlayer
          width="0"
          height="0"
          onProgress={this.onProgress}
          onDuration={this.onDuration}
          ref={this.ref}
          url={Object(this.props.music).url}
          playing={playing}
          onEnded={this.onEnded}
          volume={volume}
          loop={repeat}
        />
        <div className="header">
          <div className="title">
            <span>破车推荐</span>
          </div>
        </div>

        <div className="cover" style={{ backgroundImage: `url(${Object(this.props.music).cover})` }}>
          <div className="control">
            <div className="playing-wrap" onClick={this.handlePreviousMusic}>
              < img src="images/former-icon.png" alt="-" />
            </div>
            <div className="playing-wrap playing-wrap-second" onClick={this.playOrPauseMusic}>
              < img src={playing ? 'images/pause-icon.png' : 'images/play-icon.png'} alt="-" />
            </div>
            <div className="playing-wrap" onClick={this.handleNextMusic}>
              < img src="images/next-icon.png" alt="-" />
            </div>
          </div>
        </div>

        <div className="player-info">
          <div className="title">{Object(this.props.music).title}</div>
          <div className="artist">{Object(this.props.music).artist}</div>
        </div>
      </div>
    )
  }

}
export default Player