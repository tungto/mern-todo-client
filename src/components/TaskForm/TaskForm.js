import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { TaskContext } from '../../context/TaskContext';
import MyDatePicker from '../UI/MyDatePicker/MyDatePicker';
import MySelect from '../UI/MySelect/MySelect';
import MyTextArea from '../UI/MyTextArea/MyTextArea';
import MyTextInput from '../UI/MyTextInput/MyTextInput';

const TaskForm = ({ task }) => {
	const { addTask, updateTask } = useContext(TaskContext);
	const isEditing = task?.name ? true : false;
	const history = useHistory();

	const submitForm = async (newTask) => {
		if (isEditing) {
			const updatedTask = { ...newTask };
			const { success, message } = await updateTask(updatedTask, task._id);
			console.log(success, message);
		} else {
			const { success, message } = await addTask(newTask);
			if (success) {
				history.push('/dashboard');
			}
			console.log(success, message);
		}
	};

	return (
		<Formik
			initialValues={{
				name: task?.name ? task?.name : '',
				description: task?.description ? task?.description : '',
				priority: task?.priority ? task?.priority : 'normal',
				dueDate: task?.dueDate ? task?.dueDate : new Date(),
			}}
			validationSchema={Yup.object({
				name: Yup.string().required('Task name is Required'),
				description: Yup.string().required('Description is Required'),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(false);
				submitForm(values);
			}}>
			<FormContainer>
				<Form className="add-taks-form">
					<MyTextInput label="Task name" name="name" type="text" placeholder="Task name" className="task-name" />
					<MyTextArea label="Task description" name="description" type="text" placeholder="Task description" className="description" />

					<div className="other-infos form-section">
						<div className="due-date field">
							<label htmlFor="date">Due Date</label>
							<MyDatePicker name="dueDate" />
						</div>

						<div className="priority">
							<MySelect label="Priority" name="priority">
								<option value="">Priority</option>
								<option value="low">Low</option>
								<option value="normal">Normal</option>
								<option value="high">High</option>
							</MySelect>
						</div>
					</div>

					<button type="submit" className="btn btn-add">{`${isEditing ? 'update' : 'add'}`}</button>
				</Form>
			</FormContainer>
		</Formik>
	);
};

TaskForm.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	priority: PropTypes.string,
	dueDate: PropTypes.instanceOf(Date),
	isSelected: PropTypes.bool,
};

const FormContainer = styled.div`
	label,
	.priority label {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		text-transform: capitalize;
		font-weight: 500;
		text-align: left;
	}

	.add-taks-form {
		padding: 3rem;
		.input-title {
			padding: 10px;
			width: 80%;
			border-radius: var(--radius);
		}
		.field {
			display: flex;
			flex-direction: column;
		}
		.description {
			height: 125px;
			padding: 0.5rem;
			width: 100%;
		}
		.task-name {
			width: 100%;
			margin-bottom: 15px;
			padding: 5px 10px;
			border-radius: 3px;
			border: 1px solid grey;
		}
		.form-section {
			width: 80%;
			margin: 0 auto;
			margin-top: 1rem;
			margin-bottom: 1rem;
			justify-items: center;
			align-items: center;
		}
		.error {
			color: red;
			font-size: 12px;
			// margin-bottom: 20px;
		}

		.other-infos {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
			input,
			select {
				width: 100%;
				padding: 0.5rem;
			}
			.date-bar {
				display: flex;
				position: relative;
				.react-datepicker-wrapper {
					width: 100%;
				}
				svg {
					width: 34px;
					height: 34px;
					position: absolute;
					right: 0px;
				}
			}
		}
		.btn-add {
			background: var(--clr-red-dark);
			margin-top: 3rem;
			width: 6rem;
			:hover {
				background: var(--clr-red-light);
			}
		}
		.error-msg {
			text-align: left;
			width: 80%;
			color: var(--clr-red-dark);
			margin: 0 auto;
		}

		@media (max-width: 800px) {
			padding: 1rem 0 1rem 0;
			.btn-add {
				margin-top: 1rem;
			}
		}
	}
`;
export default TaskForm;
