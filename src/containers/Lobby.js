// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches, { fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateBatchButton from '../components/batches/CreateBatchButton'
// import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
// import WatchGameIcon from 'material-ui/svg-icons/image/remove-red-eye'
// import JoinGameIcon from 'material-ui/svg-icons/social/person-add'
// import PlayGameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
// import WaitingIcon from 'material-ui/svg-icons/image/timelapse'
import './Lobby.css'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToWebsocket()
  }

  goToBatch = batchId => event => this.props.push(`/play/${batchId}`)

  // isJoinable(game) {
  //   return game.players.length < 2 &&
  //     !this.isPlayer(game)
  // }

  // isPlayer(game) {
  //   if (!this.props.currentUser) { return false }
  //   return game.players.map(p => p.userId)
  //     .indexOf(this.props.currentUser._id) >= 0
  // }

  // isPlayable(game) {
  //   return this.isPlayer(game) && game.players.length === 2
  // }

  renderBatch = (batch, index) => {
    // let ActionIcon = this.isJoinable(game) ? JoinGameIcon : WatchGameIcon
    // if (this.isPlayer(game)) ActionIcon = this.isPlayable(game) ? PlayGameIcon : WaitingIcon
    //
    // if (!game.players[0].name) { this.props.fetchPlayers(game) }

    // const title = batch.players.map(p => (p.name || null))
    //   .filter(n => !!n)
    //   .join(' vs ')
    const title = batch.students.map(p => (p.name || null))

    return (
      <MenuItem
        key={index}
        onClick={this.goToBatch(batch._id)}
        primaryText={title} />
    )
  }

  render() {
    return (
      <div className="Lobby">
        <h1>All Batches</h1>
        <CreateBatchButton />

          <Menu>
            {this.props.batches.map(this.renderBatch)}
          </Menu>

      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })

export default connect(mapStateToProps, { fetchBatches, subscribeToWebsocket, fetchStudents, push })(Lobby)
