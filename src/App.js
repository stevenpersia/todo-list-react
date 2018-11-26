import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		tasks: []
	};

	/* Render all tasks */
	renderTasks = () => {
		const { tasks } = this.state;
		const results = tasks.map(task => (
			<li key={task._id} className="task">
				<span className="delete">
					<i className="fas fa-times" />
				</span>
				<span className="title-task" onClick={this.handleUpdate} id={task._id}>
					{task.title}
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

	/* Add new task */
	onSubmit = e => {
		axios
			.post('http://localhost:3000/create', {
				title: this.state.title,
				done: false
			})
			.then(response => {
				const newStateTasks = [...this.state.tasks];
				this.setState({
					tasks: newStateTasks
				});
			})
			.catch(err => {
				console.log(err);
			});
		e.preventDefault();
	};

	/* Update a task (done/undone) */
	handleUpdate = e => {
		axios
			.post('http://localhost:3000/update', {
				done: true
			})
			.then(response => {})
			.catch(err => {
				console.log(err);
			});
		e.preventDefault();
	};

	render() {
		return (
			<div className="tasks-list">
				<h1>TODO LIST</h1>
				<ul>{this.renderTasks()}</ul>
				<form onSubmit={this.onSubmit}>
					<input
						name="title"
						onChange={this.handleInputChange}
						placeholder="Nom de la tâche"
					/>
					<button>Ajouter un tâche</button>
				</form>
			</div>
		);
	}

	componentDidMount() {
		axios
			.get('http://localhost:3000/')
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
