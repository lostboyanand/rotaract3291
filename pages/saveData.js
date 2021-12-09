import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { DynamoDB, config } from "aws-sdk";
import { useEffect, useState } from 'react';
import { handleImageUpload } from '../components/uploadFile';

export default function Home() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [selectedFile, setSelectedFile] = useState(null);
		
	const onSubmit = event => {
		event.preventDefault();
		debugger;
		handleImageUpload(selectedFile);
	}

	useEffect(() => console.log(selectedFile), []);
		
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="file"
					//value={(selectedFile) ? selectedFile.name : ''}
					onChange={(e) => {
						//debugger;
						setSelectedFile(e.target.files[0])}}
				/>
				<button type='submit'>Upload</button>
			</form>
		</div>
	);
};
