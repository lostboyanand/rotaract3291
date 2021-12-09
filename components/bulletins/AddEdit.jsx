import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Paper, Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, FormGroup, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BULLETINS_API, MEMBERS_API } from '../urls';
import NavbarAdmin from '../../components/NavbarAdmin';
import { AccountContext } from '../../components/Account';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const BulletinSchema = Yup.object().shape({
	bulletin_link: Yup.string().url('Enter a valid URL')
	  	.required('Required'),
	publication_date: Yup.date('Invalid date').required('Required'),
});

export { AddEdit };

function AddEdit(props) {

	const bulletin = props?.data;
	const id = bulletin?.id;
	//debugger;
	const isAdd = !bulletin;
	console.log(bulletin);

	const router = useRouter();

	const [clubName, setClubName] = useState();
	const [session, setSession] = useState();
	const { getSession, logout } = useContext(AccountContext);

	const [state, setState] = useState({
		club: '',
		publication_date: '',
		bulletin_link: '',
	});

	useEffect(() => {
		getSession().then((sessionData) => {
			setSession(sessionData);

            setClubName(sessionData['clubName']);
			setState(isAdd ? {
				club: sessionData['username'],
				publication_date: '',
				bulletin_link: '',
			} : {
				club: bulletin.club,
				publication_date: bulletin.publication_date,
				bulletin_link: bulletin.bulletin_link,
			});
		}).catch((error) => {
			router.push('/admin');
		});
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			club: state.club,
			bulletin_link: state.bulletin_link,
			publication_date: state.publication_date
		},
		validationSchema: BulletinSchema,
		onSubmit: (values) => {
			const bulletin = {
				club: values.club,
				publication_date: values.publication_date,
				bulletin_link: values.bulletin_link,
			};

			const url = BULLETINS_API + '/bulletin';
			debugger;
			axios({
				method: isAdd ? 'POST' : 'PUT',
				url: isAdd ? url : url + '/' + id,
				data: bulletin
			}).then((response) => {
				//debugger;
				console.log(response.data);
				router.push('/bulletins');
				//setSubmitLoading(false);
			}).catch((error) => {
					console.log(error);
			});
		},
	});

  	return (
        <>
            <NavbarAdmin session={session} />
			<div className="my-8" style={{ overflowX: 'hidden' }} >
				<Container>
					<Grid container direction="column" justify="center" alignItems="center">
						<Grid container xs={12} sm={6}>
							<div className="text-3xl font-sub-heading text-center">{(bulletin) ? 'Edit' : 'Add'} Bulletin</div>

							<div className="w-full my-8 font-text">
      							<form onSubmit={formik.handleSubmit}>	  
									<div class="mb-4 inline-block relative w-full">
										<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
											Rotaract Club of
										</label>
										<input disabled value={clubName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
									</div>
									<div class="mb-4 inline-block relative w-full">
										<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
											Bulletin Link
										</label>
										<input onChange={formik.handleChange} value={formik.values.bulletin_link} name="bulletin_link" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bulletin_link" type="url" placeholder="Bulletin Link" />
										{formik.errors.bulletin_link && formik.touched.bulletin_link ? (
											<div className="text-red-700">{formik.errors.bulletin_link}</div>
										) : null}
									</div>
									<div class="mb-4 inline-block relative w-full">
										<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
											Publication Date
										</label>
										<input onChange={formik.handleChange} value={formik.values.publication_date} name="publication_date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="publication_date" type="date" placeholder="Publication Date" />
										{formik.errors.publication_date && formik.touched.publication_date ? (
											<div className="text-red-700">{formik.errors.publication_date}</div>
										) : null}
									</div>
									<div class="inline-block relative w-full">
										<button className="bg-theme-blue text-theme-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
									</div>
								</form>
							</div>

							<br />
							<br />
						</Grid>
					</Grid>
				</Container>
			</div>
		</>
	);
}
