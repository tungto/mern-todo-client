import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
	const { logoutUser, deleteUser } = useContext(AuthContext);
	const logout = () => logoutUser();
	return (
		<NavContainer className="navbar">
			<ul className="nav-links">
				<li className="link">
					<Link to="/" exact="true">
						Dashboard
					</Link>
				</li>
				<li className="link">
					<Link to="/add">Add Todo</Link>
				</li>
				<li className="link">
					<button onClick={logout} className="logout-btn">
						Logout
					</button>
				</li>
				<li className="link">
					<button onClick={deleteUser} className="logout-btn">
						Delete Account
					</button>
				</li>
			</ul>
		</NavContainer>
	);
};

const NavContainer = styled.div`
	.nav-links {
		display: flex;
		justify-content: center;
	}
	.link {
		margin: 1rem;
		a {
			padding: 0.5rem;
			font-weight: 500;
			:hover {
				border-bottom: 1px solid var(--clr-black);
			}
		}
	}
	.logout-btn {
		padding: 5px 10px;
		border: 1px solid;
		color: #fff;
		background-color: #dc3545;
		border-color: #dc3545;
		border-radius: 3px;
		cursor: pointer;
		:hover {
			opacity: 0.8;
		}
	}
	@media (min-width: 800px) {
		padding: 2rem;
	}
`;
export default Header;
