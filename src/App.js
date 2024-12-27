import React, { useContext } from 'react'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'
import AuthContext from './components/store/auth-context'

function App() {
	const authCtx = useContext(AuthContext)
	return (
		<>
			<MainHeader />
			<main>
				{!authCtx.Logged && <Login />}
				{authCtx.Logged && <Home />}
			</main>
		</>
	)
}

export default App
