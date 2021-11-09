import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import MyTextInput from '../UI/MyTextInput/MyTextInput';
import styled from 'styled-components';

function LoginForm() {
	// Context
	const { loginUser } = useContext(AuthContext);
	const [alertMessage, setAlertMessage] = useState('');

	// const history = useHistory();

	// Login
	const login = async (values) => {
		try {
			const loginData = await loginUser(values);
			if (loginData.success) {
			} else {
				setAlertMessage(loginData.message);
				setTimeout(() => setAlertMessage(null), 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Wrapper>
			{alertMessage && <AlertMessage message={alertMessage} />}
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={Yup.object({
					email: Yup.string().email().required('Username is Required'),
					password: Yup.string().min(6, 'Must be 6 characters or more').required('Password is Required'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					login(values);
					setSubmitting(false);
				}}>
				<Form className="login-form">
					<MyTextInput label="User name" name="email" type="text" placeholder="Username" />
					<MyTextInput label="Password" name="password" type="password" placeholder="Password" />
					<button type="submit" className="btn btn-login">
						Login
					</button>
				</Form>
			</Formik>
			<br />
			<p>
				Don't have an account?
				<Link to="/register">
					<button className="btn btn-register">Register</button>
				</Link>
			</p>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	.login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		margin-top: 50px;
		input {
			border: 1px solid grey;
			padding: 5px 10px;
			margin: 10px;
			width: 400px;
			border-radius: 3px;
		}
		.error {
			font-size: 10px;
			color: red;
			text-align: left;
		}
	}
	button.btn-login {
		color: #fff;
		background-color: #28a745;
		border-color: #28a745;
		margin-left: 10px;
	}
	.btn-register {
		margin-left: 10px;
		color: #fff;
		background-color: #007bff;
		border-color: #007bff;
	}
`;

export default LoginForm;
