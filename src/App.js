import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		tasks: []
	};

	/* Add new task */
	onSubmit = e => {
		axios
			.post('https://todolist-react-api.herokuapp.com/create', {
				title: this.state.title,
				done: false
			})
			.then(response => {
				axios
					.get('https://todolist-react-api.herokuapp.com/')
					.then(response => {
						this.setState({
							tasks: response.data
						});
					})
					.catch(error => {
						console.log(error);
					});
			})
			.catch(err => {
				console.log(err);
			});
		e.preventDefault();
	};

	/* Update task (done/undone) */
	updateStatusTask = task => {
		axios
			.post('https://todolist-react-api.herokuapp.com/update', {
				_id: task._id
			})
			.then(response => {
				axios
					.get('https://todolist-react-api.herokuapp.com/')
					.then(response => {
						this.setState({
							tasks: response.data
						});
					})
					.catch(error => {
						console.log(error);
					});
			})
			.catch(err => {
				console.log(err);
			});
	};

	/* Delete task */
	deleteTask = task => {
		axios
			.post('https://todolist-react-api.herokuapp.com/delete', {
				_id: task._id
			})
			.then(response => {
				const newStateTasks = [...this.state.tasks];
				newStateTasks.splice(newStateTasks.indexOf(task), 1);
				this.setState({
					tasks: newStateTasks
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	/* Render all tasks */
	renderTasks = () => {
		const { tasks } = this.state;
		const results = tasks.map(task => (
			<li key={task._id} className={task.done === true ? 'task' : ''}>
				<span className="title-task">{task.title}</span>
				<span
					className="delete"
					onClick={() => {
						this.deleteTask(task);
					}}
				>
					<i className="fas fa-trash" />
				</span>
				<span
					className="done"
					onClick={() => {
						this.updateStatusTask(task);
					}}
				>
					<i className="fas fa-check" />
				</span>
			</li>
		));
		return results;
	};

	/* Save input */
	handleInputChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div className="container">
				<h1>TODO LIST</h1>
				{/* SEARCH FEATURE NOT ADD FOR NOW BUT STYLING IS DONE
				<form onSubmit="" className="search">
					<input
						name="search"
						onChange={this.handleInputChange}
						placeholder="Rechercher une tâche"
					/>
					<button>Rechercher</button>
				</form>
				 */}
				<div className="tasks-list">
					<ul>{this.renderTasks()}</ul>
					<form onSubmit={this.onSubmit} className="add-task">
						<input
							name="title"
							onChange={this.handleInputChange}
							placeholder="Nom de la tâche"
						/>
						<button>Ajouter</button>
					</form>
				</div>
			</div>
		);
	}

	componentDidMount() {
		axios
			.get('https://todolist-react-api.herokuapp.com/')
			.then(response => {
				this.setState({
					tasks: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export default App;
