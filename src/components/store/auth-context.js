import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext({
	Logged: false,
	onLogOut: () => {},
	onLogIn: (password, email) => {},
})

export const AuthContextProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const logged = localStorage.getItem('isLoggedIn')

		if (logged === '1') {
			setIsLoggedIn(true)
		}
	}, [])
	const loginHandler = (email, password) => {
		console.log('log')
		localStorage.setItem('isLoggedIn', '1')
		setIsLoggedIn(true)
	}

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn')
		setIsLoggedIn(false)
	}

	return (
		<AuthContext.Provider
			value={{
				Logged: isLoggedIn,
				onLogOut: logoutHandler,
				onLogIn: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContext
