import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { searchLogs } from '../../actions/logActions'

const SearchBar = ({ searchLogs }) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    searchLogs(search)
    // eslint-disable-next-line
  }, [search])

  const onSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <nav style={{ marginBottom: '30px' }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input id="search" type="search" placeholder="Search Logs" value={search} onChange={onSearch} />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <i className="material-icons" onClick={() => setSearch('')}>close</i>
          </div>
        </form>
      </div>
    </nav>
  )
}

SearchBar.propTypes = {
  searchLogs: PropTypes.func
}

export default connect(null, { searchLogs })(SearchBar)
