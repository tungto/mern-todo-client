import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { TaskContext } from '../../context/TaskContext';
import MySelect from '../UI/MySelect/MySelect';
import MyTextInput from '../UI/MyTextInput/MyTextInput';

const SearchBar = () => {
	const { searchTask, sortTasks } = useContext(TaskContext);

	const [keyword, setKeyword] = useState('');
	const [sortBy, setSortBy] = useState('');

	useEffect(() => {
		searchTask(keyword);
	}, [keyword]);

	useEffect(() => {
		if (sortBy) {
			sortTasks(sortBy);
		}
	}, [sortBy]);

	const handleChange = (e) => {
		setKeyword(e.target.value);
	};

	const handleSortTask = (e) => {
		setSortBy(e.target.value);
	};

	return (
		<Wrapper>
			<Formik
				initialValues={{
					keyword: '',
					sortBy: '',
				}}
				validationSchema={Yup.object({
					keyword: Yup.string(),
				})}>
				<Form className="search-bar-container">
					<MyTextInput
						label="Search"
						name="keyword"
						type="text"
						placeholder="Search Task"
						onChange={handleChange}
						value={keyword}
						className="search-bar"
					/>

					<MySelect label="Sort By" name="sortBy" onChange={handleSortTask} className="select-sort" value={sortBy}>
						<option value="resetSort">Sort By</option>
						<option value="name">Name</option>
						<option value="dueDate">Due Date</option>
						<option value="priority">Priority</option>
					</MySelect>
				</Form>
			</Formik>
			<Link to="/add" className="btn-add-task">
				<FaPlusSquare />
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	.search-bar-container {
		display: flex;
		justify-content: center;
		.search-bar {
			margin-right: 20px;
			height: 40px;
			border-radius: 3px;
			width: 400px;
			padding: 3px 10px;
			border: 1px solid grey;
			font-weight: bold;
		}
		.select-sort {
			height: 40px;
			border-radius: 3px;
			width: 150px;
		}
	}
	.btn-add-task {
		margin-left: 20px;

		svg {
			height: 40px;
			width: 50px;
			fill: #28a745;
		}
	}
`;

export default SearchBar;
