import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import TaskList from '../components/TaskList/TaskList';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';

function Dashboard() {
	// Contexts
	const {
		taskState: { tasks, taskLoading, filteredTasks, isSearching },
		getTasks,
	} = useContext(TaskContext);

	const {
		authState: { user },
	} = useContext(AuthContext);

	useEffect(() => getTasks(), []);
	let taskList = isSearching ? filteredTasks : tasks;
	let body;

	if (taskLoading) {
		body = <h1>Loading.....</h1>;
	} else if (!isSearching && taskList.length < 1) {
		body = (
			<>
				<h5>There's no task, create some</h5>
				<Link to="/add" exact="true" className="btn btn-fill">
					Add Task
				</Link>
			</>
		);
	} else {
		body = (
			<>
				<br />

				<SearchBar />
				<br />
				<TaskList tasks={taskList} />
				{taskList.length < 1 && isSearching && <h1>No Task Found!</h1>}
			</>
		);
	}
	return (
		<Wrapper>
			<div className="home-page section-center">
				<Header />
				<h3>Todo List</h3>
				<h4>Have a nice day, {user.name}!</h4>
				<br />
				{body}
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	.btn-fill {
		background: var(--clr-blue-dark);
	}
	.home-page {
		padding-right: 3rem;
		padding-left: 3rem;

		@media (max-width: 800px) {
			padding-right: 0rem;
			padding-left: 0rem;
		}
	}
`;

export default Dashboard;
