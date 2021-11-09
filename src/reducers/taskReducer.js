import * as Types from '../actions';
import { findTaskIndex } from '../utils/helpers';

const taskReducer = (state, action) => {
	const { type, payload } = action;
	if (type === Types.POSTS_LOADED_SUCCESS) {
		return {
			...state,
			tasks: payload,
			taskLoading: false,
		};
	}
	if (type === Types.POSTS_LOADED_FAIL) {
		return {
			...state,
			tasks: [],
			taskLoading: false,
		};
	}

	if (type === Types.ADD_TASK) {
		return { ...state, tasks: [...state.tasks, payload] };
	}

	if (type === Types.DELETE_TASK) {
		const newTaskList = state.tasks.filter((task) => task._id !== payload);
		return { ...state, tasks: newTaskList };
	}

	if (type === Types.UPDATE_TASK) {
		const updatedTaskIndex = findTaskIndex(state.tasks, payload);
		const updatedTaskList = [...state.tasks];
		updatedTaskList[updatedTaskIndex] = payload;
		return {
			...state,
			tasks: updatedTaskList,
		};
	}

	if (type === Types.SELECT_TASK) {
		let { selectedItems } = state;
		const updatedTaskList = state.tasks.map((task) => {
			if (task.id === payload) {
				selectedItems += !task.isSelected ? 1 : -1;
				return { ...task, isSelected: !task.isSelected };
			} else {
				return task;
			}
		});

		return {
			...state,
			tasks: updatedTaskList,
			selectedItems,
		};
	}

	if (type === Types.REMOVE_SELECTED_TASKS) {
		const updatedTaskList = state.tasks.filter((task) => !task.isSelected);
		return { ...state, tasks: updatedTaskList, selectedItems: 0 };
	}

	if (type === Types.UPDATE_FILTERS) {
		const { name, value } = payload;
		return { ...state, filters: { ...state.filters, [name]: value } };
	}

	if (type === Types.FILTER_TASKS) {
		const tempTasks = [...state.tasks];
		const { text } = state.filters;
		const searchResults = tempTasks.filter((task) => {
			return task.title.toLowerCase().startsWith(text.toLowerCase());
		});
		return {
			...state,
			filtered_tasks: searchResults,
		};
	}
	if (type === Types.SEARCH_TASK) {
		if (payload.length > 0) {
			const searchResults = state.tasks.filter((task) => task.name.toLowerCase().startsWith(payload.toLowerCase()));
			return { ...state, filteredTasks: searchResults, isSearching: true };
		} else {
			return { ...state, filteredTasks: [], isSearching: false };
		}
	}

	if (type === Types.SORT_TASKS) {
		return {
			...state,
			tasks: payload,
		};
	}

	throw new Error(`No Matching ${type} - action type`);
};

export default taskReducer;
