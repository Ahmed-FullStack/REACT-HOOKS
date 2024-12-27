import React, {
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react'
import Input from '../UI/Input/Input'
import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

import AuthContext from '../store/auth-context'

const FORMACTIONS = {
	USERINPUT: 'USER_INPUT',
	USERBLUR: 'USER_BLUR',
}

const emailReducer = (emailState, action) => {
	switch (action.type) {
		case FORMACTIONS.USERINPUT:
			return {
				value: action.value,
				isValid: action.value.includes('@gmail'),
			}
		case FORMACTIONS.USERBLUR:
			return {
				value: emailState.value,
				isValid: emailState.value.includes('@gmail'),
			}

		default:
			return emailState
	}
}

const passwordReducer = (passwordState, action) => {
	switch (action.type) {
		case FORMACTIONS.USERINPUT:
			return {
				value: action.value,
				isValid: action.value.trim().length > 6,
			}
		case FORMACTIONS.USERBLUR:
			return {
				value: passwordState.value,
				isValid: passwordState.value.trim().length > 6,
			}

		default:
			return passwordState
	}
}

const Login = props => {
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: undefined,
	})
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: undefined,
	})

	const [formIsValid, setFormIsValid] = useState(false)

	const emailRef = useRef()
	const passwordRef = useRef()

	const { isValid: emailIsValid } = emailState
	const { isValid: passwordIsValid } = passwordState
	const authCtx = useContext(AuthContext)

	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(emailIsValid && passwordIsValid)
		}, 400)

		return () => {
			clearTimeout(identifier)
		}
	}, [emailIsValid, passwordIsValid, formIsValid])

	const emailChangeHandler = e => {
		dispatchEmail({ type: FORMACTIONS.USERINPUT, value: e.target.value })
	}

	const passwordChangeHandler = e => {
		dispatchPassword({ type: FORMACTIONS.USERINPUT, value: e.target.value })
	}

	const validateEmailHandler = () => {
		dispatchEmail({ type: FORMACTIONS.USERBLUR })
	}

	const validatePasswordHandler = () => {
		dispatchPassword({ type: FORMACTIONS.USERBLUR })
	}

	const submitHandler = event => {
		event.preventDefault()
		if (formIsValid) {
			authCtx.onLogIn(emailState.value, passwordState.value)
		} else if (!emailIsValid) {
			emailRef.current.active()
		} else {
			passwordRef.current.active()
		}
	}

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailRef}
					label='Email'
					id='email'
					type='email'
					stateValue={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
					isValid={emailIsValid}
				/>

				<Input
					ref={passwordRef}
					label='Password'
					type='password'
					value={passwordState.value}
					id='password'
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
					isValid={passwordIsValid}
				/>
				<div className={classes.actions}>
					<Button type='submit' className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
