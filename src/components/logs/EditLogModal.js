import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateLog, clearCurrent } from '../../actions/logActions'
import TechSelectOptions from '../techs/TechSelectOptions'
import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min.js'

const EditLogModal = ({ log: { current }, tech: { techs }, updateLog, clearCurrent }) => {
  const [message, setMessage] = useState('')
  const [attention, setAttention] = useState(false)
  const [tech, setTech] = useState('')

  useEffect(() => {
    if (current !== null) {
      setMessage(current.message)
      setAttention(current.attention)
    }
    // eslint-disable-next-line
  }, [current])

  const onSubmit = () => {
    if (message.trim() === '' || tech === '') {
      M.toast({ html: "Please enter a log message and select tech." })
    } else {
      const updatedLog = {
        id: current.id,
        message,
        tech,
        attention,
        date: new Date()
      }
      updateLog(updatedLog)
      M.toast({ html: `Log #${current.id} updated by ${tech}.` })

      // Clear fields
      setMessage('')
      setTech('')
      setAttention(false)
      clearCurrent()
    }
  }

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit System Log #{current && current.id}</h4>
        <div className="row">
          <div className="input-field">
            <input type="text" name='message' value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className='browser-default'
              onChange={(e) => { setTech(e.target.value) }}
            >
              <option value="" disabled>Select Technician</option>
              <TechSelectOptions />
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <a href="#!" onClick={onSubmit} className="modal-close waves-effect blue waves-light btn">Enter</a>
      </div>
    </div>
  )
}

const modalStyle = {
  width: "75%",
  height: "75%"
}

EditLogModal.propTypes = {
  log: PropTypes.object.isRequired,
  updateLog: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  log: state.log,
  tech: state.tech
})

export default connect(mapStateToProps, { updateLog, clearCurrent })(EditLogModal)
