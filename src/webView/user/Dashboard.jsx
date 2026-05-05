import React from 'react'
import '../../web.css'
import LiveTicker from './components/LiveTicker'

export default function Dashboard() {
  return (
    <div className='custom-container flex flex-col gap-4'>
     <LiveTicker/>
    </div>
  )
}
