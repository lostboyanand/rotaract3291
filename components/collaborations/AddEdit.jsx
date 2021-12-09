import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Paper, Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, FormGroup, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { COLLABORATIONS_API } from '../urls';
import NavbarAdmin from '../../components/NavbarAdmin';
import { AccountContext } from '../../components/Account';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CollaborationSchema = Yup.object().shape({
	organisers: Yup.string().required('Required'),
	project_name: Yup.string().required('Required'),
	rid: Yup.string().required('Required'),
	collaboration_date: Yup.date('Invalid date').required('Required'),
	collaboration_type: Yup.string().required('Required'),
	media: Yup.string().url('Enter a valid URL').required('Required'),
});

export { AddEdit };

function AddEdit(props) {
	const collaboration = props?.data;
	const id = collaboration?.id;
	//debugger;
	const isAdd = !collaboration;
	console.log(collaboration);

	const router = useRouter();
	const [clubName, setClubName] = useState();
	const [session, setSession] = useState();
    const { getSession, logout } = useContext(AccountContext);
  
	const [state, setState] = useState({
		club: '',
		organisers: '',
		project_name: '',
		collaboration_date: '',
		collaboration_type: '',
		rid: '',
		media: '',
	});

    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);

            setClubName(sessionData['clubName']);
			setState(isAdd ? {
				club: sessionData['username'],
				organisers: '',
				project_name: '',
				collaboration_date: '',
				collaboration_type: '',
				rid: '',
				media: '',
			} : {
				club: collaboration.club,
				organisers: collaboration.organisers,
				project_name: collaboration.project_name,
				collaboration_date: collaboration.collaboration_date,
				collaboration_type: collaboration.collaboration_type,
				rid: collaboration.rid,
				media: collaboration.media,
			});
		}).catch((error) => {
			router.push('/admin');
		});
	}, []);

	useEffect(() => console.log(state), [state])

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			club: state.club,
			organisers: state.organisers,
			project_name: state.project_name,
			collaboration_date: state.collaboration_date,
			collaboration_type: state.collaboration_type,
			rid: state.rid,
			media: state.media,
		},
		validationSchema: CollaborationSchema,
		onSubmit: (values) => {
			const collaboration = {
				club: values.club,
				organisers: values.organisers,
				project_name: values.project_name,
				collaboration_date: values.collaboration_date,
				collaboration_type: values.collaboration_type,
				rid: values.rid,
				media: values.media,
			};

			const url = COLLABORATIONS_API + '/collaboration';

			axios({
				method: isAdd ? 'POST' : 'PUT',
				url: isAdd ? url : url + '/' + id,
				data: collaboration
			}).then((response) => {
				debugger;
				console.log(response.data);
				router.push('/collaborations');
				//setSubmitLoading(false);
			}).catch((error) => {
					console.log(error);
			});
		}
	});

  	return (
        <>
            <NavbarAdmin session={session} />
			<div className="my-8" style={{ overflowX: 'hidden' }} >
			<Container>
				<Grid container direction="column" justify="center" alignItems="center">
					<Grid container xs={12} sm={6}>
						<div className="text-3xl font-sub-heading text-center">{(collaboration) ? 'Edit' : 'Add'} Collaboration</div>

						<div className="w-full my-8 font-text">
							<form onSubmit={formik.handleSubmit}>	  
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Rotaract Club of
									</label>
									<input disabled value={clubName} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Organised By
									</label>
									<input onChange={formik.handleChange} value={formik.values.organisers} name="organisers" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Organised By" />
									{formik.errors.organisers && formik.touched.organisers ? (
										<div className="text-red-700">{formik.errors.organisers}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Project Name
									</label>
									<input onChange={formik.handleChange} value={formik.values.project_name} name="project_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Project Name" />
									{formik.errors.project_name && formik.touched.project_name ? (
										<div className="text-red-700">{formik.errors.project_name}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Collaboration Date
									</label>
									<input onChange={formik.handleChange} value={formik.values.collaboration_date} name="collaboration_date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" />
									{formik.errors.collaboration_date && formik.touched.collaboration_date ? (
										<div className="text-red-700">{formik.errors.collaboration_date}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">Collaboration Type (Venue)</label>
									<div className="grid grid-cols-2 grid-rows-1">
										<div>
											<label class="text-gray-700 text-sm mb-2">
												<input checked={formik.values.collaboration_type === 'offline'} onChange={formik.handleChange} value={'offline'} name="collaboration_type" type="radio"/>
												<span className="ml-2">Offline</span>
											</label>
										</div>
										<div>
											<label class="text-gray-700 text-sm mb-2">
												<input checked={formik.values.collaboration_type === 'online'} onChange={formik.handleChange} value={'online'} name="collaboration_type" type="radio"/>
												<span className="ml-2">Online</span>
											</label>
										</div>
									</div>
									{formik.errors.collaboration_type && formik.touched.collaboration_type ? (
										<div className="text-red-700">{formik.errors.collaboration_type}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Photos/Video Link (Add Collaboration Poster or Photographs)
									</label>
									<input onChange={formik.handleChange} value={formik.values.media} name="media" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="url" placeholder="Photos/Videos Link" />
									{formik.errors.media && formik.touched.media ? (
										<div className="text-red-700">{formik.errors.media}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										RI District
									</label>
									<input onChange={formik.handleChange} value={formik.values.rid} name="rid" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="RI District" />
									{formik.errors.rid && formik.touched.rid ? (
										<div className="text-red-700">{formik.errors.rid}</div>
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
