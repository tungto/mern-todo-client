import axios from 'axios';
import React, { useReducer } from 'react';
import * as Types from '../actions';
import taskReducer from '../reducers/taskReducer';
import { apiUrl } from '../utils/constants';

export const TaskContext = React.createContext();

const TaskContextProvider = ({ children }) => {
	const [taskState, dispatch] = useReducer(taskReducer, {
		tasks: [],
		selectedItems: 0,
		isSearching: false,
		filteredTasks: [],
		sort: 'due-date',
		taskLoading: true,
	});

	const getTasks = async () => {
		try {
			const response = await axios.get(`${apiUrl}/tasks`);
			if (response.data.success) {
				dispatch({ type: Types.POSTS_LOADED_SUCCESS, payload: response.data.tasks });
			}
		} catch (error) {
			dispatch({ type: Types.POSTS_LOADED_FAIL });
		}
	};

	const addTask = async (newTask) => {
		try {
			const response = await axios.post(`${apiUrl}/tasks`, newTask);
			if (response.data.success) {
				dispatch({ type: Types.ADD_TASK, payload: response.data.task });
				return response.data;
			}
		} catch (error) {
			return error.response.data ? error.response.data : { success: false, message: 'Server error' };
		}
	};

	const removeTask = async (id) => {
		try {
			const response = await axios.delete(`${apiUrl}/tasks/${id}`);
			if (response.data.success) {
				dispatch({ type: Types.DELETE_TASK, payload: id });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateTask = async (updatedTask, taskId) => {
		try {
			const response = await axios.patch(`${apiUrl}/tasks/${taskId}`, updatedTask);
			if (response.data.success) {
				dispatch({ type: Types.UPDATE_TASK, payload: response.data.task });

				return response.data;
			}
		} catch (error) {
			return error.response.data ? error.response.data : { success: false, message: 'Server error' };
		}
	};

	const selectTask = (id) => {
		dispatch({ type: Types.SELECT_TASK, payload: id });
	};

	const removeSelectedTasks = () => {
		dispatch({ type: Types.REMOVE_SELECTED_TASKS });
	};

	const updateFilters = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch({ type: Types.UPDATE_FILTERS, payload: { name, value } });
	};

	const searchTask = (keyword) => {
		dispatch({ type: Types.SEARCH_TASK, payload: keyword });
	};
	const sortTasks = async (sortBy) => {
		console.log(sortBy, 'check sortby');

		try {
			let response;
			if (sortBy === 'resetSort') {
				response = await axios.get(`${apiUrl}/tasks`);
			} else {
				response = await axios.get(`${apiUrl}/tasks?sortBy=${sortBy}:asc`);
			}

			console.log(response.data.tasks);

			dispatch({ type: Types.SORT_TASKS, payload: response.data.tasks });
		} catch (error) {
			return error.response.data ? error.response.data : { success: false, message: 'Server error' };
		}
	};

	const taskContextData = {
		taskState,
		getTasks,
		addTask,
		removeTask,
		updateTask,
		selectTask,
		removeSelectedTasks,
		updateFilters,
		searchTask,
		sortTasks,
	};

	return <TaskContext.Provider value={taskContextData}>{children}</TaskContext.Provider>;
};

export default TaskContextProvider;
