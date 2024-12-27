import React, { useContext } from 'react'
import AuthContext from '../store/auth-context'

import classes from './Navigation.module.css'

const Navigation = () => {
	const ctx = useContext(AuthContext)

	return (
		<nav className={classes.nav}>
			<ul>
				{ctx.Logged && (
					<li>
						<a href='/'>Users</a>
					</li>
				)}
				{ctx.Logged && (
					<li>
						<a href='/'>Admin</a>
					</li>
				)}
				{ctx.Logged && (
					<li>
						<button onClick={ctx.onLogOut}>Logout</button>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default Navigation
