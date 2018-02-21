import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
// import doTurn from '../actions/games/doTurn'
import { connect as subscribeToWebsocket } from '../actions/websocket'
// import JoinGameDialog from '../components/games/JoinGameDialog'
// import TurnButton from '../components/games/TurnButton'

const evaluationShape = PropTypes.shape({
  color: PropTypes.string,
  date: PropTypes.date,
  remark: PropTypes.string
})

const studentShape = PropTypes.shape({
  name: PropTypes.string,
  photo: PropTypes.string,
  evaluation: evaluationShape,
})

class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(studentShape).isRequired,
      // updatedAt: PropTypes.string.isRequired,
      // createdAt: PropTypes.string.isRequired,
    }),
  }

  componentWillMount() {
    const { batch, fetchOneBatch, subscribeToWebsocket } = this.props
    const { batchId } = this.props.match.params

    if (!batch) { fetchOneBatch(batchId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { batch } = nextProps

    if (batch && !batch.students[0].name) {
      this.props.fetchStudents(batch)
    }
  }

  render() {
    const { batch } = this.props

    if (!batch) return null

    const title = batch.students.map(p => (p.name || null))

    return 
      // <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center' }} className="Game">
      //   <h1>Pick Your Weapon</h1>
      //   <p>{title}</p>
      //
      //   <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row wrap' }}>
      //     <TurnButton
      //       onClick={this.doTurnWithGameId('rock')}
      //       weapon="rock"
      //     />
      //     <TurnButton
      //       onClick={this.doTurnWithGameId('paper')}
      //       weapon="paper"
      //     />
      //     <TurnButton
      //       onClick={this.doTurnWithGameId('scissors')}
      //       weapon="scissors"
      //     />
      //   </div>
      //
      //   <JoinGameDialog gameId={game._id} />
      // </div>

  }
}

const mapStateToProps = ({ batches }, { match }) => {
  const batch = batches.filter((g) => (g._id === match.params.batchId))[0]
  // const currentPlayer = game && game.players.filter((p) => (p.userId === currentUser._id))[0]
  return {
    batch,
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneBatch,
  fetchStudents,
})(Batch)
