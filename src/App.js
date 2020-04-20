import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('/repositories').then(response => {
			setRepositories(response.data);
		})
	}, []);

	async function handleAddRepository() {
		const response = await api.post('/repositories', {
			"title": `Novo Repositório ${Date.now()}`,
			"url": "https://github.com/camilasass/bootcamp-gostack-conceitos-nodejs",
			"techs": ["Node.js"]
		});

		setRepositories([...repositories, response.data]);
	}

	async function handleRemoveRepository(id) {
		const response = await api.delete(`/repositories/${id}`);
		console.log(response);

		if(response.status === 204) {
			const newRepositories = repositories.filter( repo => repo.id !== id);

			setRepositories(newRepositories);
		}
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map(repo => (
					<li key={repo.id}>
						{repo.title}
						<button onClick={() => handleRemoveRepository(repo.id)}>
							Remover
						</button>
					</li>
				))}

			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
