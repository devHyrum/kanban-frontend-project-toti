import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <ul>
            <li><Link to="/kanban/dashboard">Boards</Link></li>
            <li><Link to="/kanban/groups">Equipes</Link></li>
            <li><Link to="/kanban/reports">Relatórios</Link></li>
            <li><Link to="/kanban/myProfile">Ajustes</Link></li>
        </ul>
    </div>
  )
}
