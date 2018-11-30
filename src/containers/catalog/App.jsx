import React from 'react'
import './App.css'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Player from '../player/Player.jsx'
import List from '../list/List.jsx'

let listComponent
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playingMusic: {},
      listEvent: ''
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <Player music={this.state.playingMusic} onNextMusic={this.onPlayNextMusic} onPreviousMusic={this.onPlayPreviousMusic}></Player>
        <List ref={this.list} onChangeMusic={this.onChangeMusic} execEvent={this.state.listEvent}></List>
      </div >
    )
  }

  list = (list) => {
    this.listComponent = list
  }

  onChangeMusic = (music) => {
    this.setState({ playingMusic: music, listEvent: '' })
  }

  onPlayerMusic = (music) => {
    this.setState({ playingMusic: music })
  }
  onPlayPreviousMusic = () => {
    const music = this.listComponent.getPreviousMusic()
    this.setState({ playingMusic: music })
    console.log(music);
    
  }

  onPlayNextMusic = () => {
    const music = this.listComponent.getNextMusic()
    this.setState({ playingMusic: music })
    console.log(music);
  }
  getChildIndex = (index) => {
    this.setState({ index: index })
  }
}

export default App
