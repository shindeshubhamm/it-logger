import React from 'react'
import { connect } from 'react-redux'
import { deleteLog, setCurrent } from '../../actions/logActions'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min.js'

const LogItem = ({ log, deleteLog, setCurrent }) => {
  const onDelete = () => {
    deleteLog(log.id)
    M.toast({ html: `Log #${log.id} deleted successfully.` })
  }

  const onEdit = () => {
    setCurrent(log)
  }

  return (
    <div className="collection-item">
      <a
        href="#edit-log-modal"
        onClick={onEdit}
        className={`modal-trigger ${log.attention ? 'red-text' : 'blue-text'}`}>
        {log.message}
      </a>
      <br />
      <span className="grey-text">
        <span className="black-text">ID #{log.id}</span>
        {' '}Last updated by{' '}<span className="black-text">{log.tech}</span> on{' '}
        <Moment format='MMMM Do YYYY, h:mm:ss a' date={log.date} />
      </span>
      <a href="#!" className="secondary-content" onClick={onDelete}>
        <i className="material-icons grey-text">delete</i>
      </a>
    </div>
  )
}

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
}

export default connect(null, { deleteLog, setCurrent })(LogItem)
