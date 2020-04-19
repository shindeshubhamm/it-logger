import React, { useState, useEffect } from 'react'
import LogItem from './LogItem'
import Preloader from '../layout/Preloader'

const Logs = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)

  const getLogs = async () => {
    setLoading(true)
    const res = await fetch('/logs')
    const data = await res.json()

    setLogs(data)
    setLoading(false)
  }

  useEffect(() => {
    getLogs()
  }, [])

  if (loading) {
    return <Preloader />
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (<p className="center">No logs to show...</p>) : (
        logs.map((log) => <LogItem key={log.id} log={log} />)
      )}
    </ul>
  )
}

export default Logs
