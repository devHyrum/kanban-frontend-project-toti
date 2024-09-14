import React from 'react'
import logoTotiDark from './logoTotiDark.png'
import { Link, NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <picture>
          <Link to="/">
          <img src={logoTotiDark} alt="logoTotiDark"/>
          </Link>
        </picture>
        <nav className="sidebar">
      <ul>
        <li>
          <NavLink
            to="/kanban/dashboard"
            className={({ isActive }) =>
              isActive ? 'active-link' : 'inactive-link'
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/kanban/groups"
            className={({ isActive }) =>
              isActive ? 'active-link' : 'inactive-link'
            }
          >
            Equipes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/kanban/reports"
            className={({ isActive }) =>
              isActive ? 'active-link' : 'inactive-link'
            }
          >
            Relatórios
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/kanban/myProfile"
            className={({ isActive }) =>
              isActive ? 'active-link' : 'inactive-link'
            }
          >
            Ajustes
          </NavLink>
        </li>
      </ul>
    </nav>
    </div>
  )
}
