import React, { useContext } from 'react';
import styled from 'styled-components';
import { TaskContext } from '../../context/TaskContext';
import BuldAction from '../BuldAction/BuldAction';
import TaskItem from '../TaskItem/TaskItem';
const TaskList = ({ tasks }) => {
	const { selectedItems } = useContext(TaskContext);

	return (
		<TaskListContainer>
			{tasks.map((task, index) => {
				return <TaskItem key={index} {...task} />;
			})}

			{selectedItems > 0 && <BuldAction />}
		</TaskListContainer>
	);
};

const TaskListContainer = styled.div`
	width: 100%;
	margin: 0 auto;
`;

export default TaskList;
