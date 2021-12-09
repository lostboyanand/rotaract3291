import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Paper, Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, FormGroup, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PARTICIPATIONS_API } from '../urls';
import NavbarAdmin from '../../components/NavbarAdmin';
import { AccountContext } from '../../components/Account';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ParticipationSchema = Yup.object().shape({
	organisers: Yup.string().required('Required'),
	project_name: Yup.string().required('Required'),
	project_date: Yup.date('Invalid date').required('Required'),
	rid: Yup.string().required('Required'),
	members: Yup.number('Invalid number').required('Required').integer(),
});

export { AddEdit };

function AddEdit(props) {
	const participation = props?.data;
	const id = participation?.id;
	//debugger;
	const isAdd = !participation;
	console.log(participation);

	const router = useRouter();
	const [clubName, setClubName] = useState();
	const [session, setSession] = useState();
    const { getSession, logout } = useContext(AccountContext);
  
	const [state, setState] = useState({
		club: '',
		organisers: '',
		project_name: '',
		project_date: '',
		rid: '',
		members: '',
	});

    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);

            setClubName(sessionData['clubName']);
			setState(isAdd ? {
				club: sessionData['username'],
				organisers: '',
				project_name: '',
				project_date: '',
				rid: '',
				members: '',
			} : {
				club: participation.club,
				organisers: participation.organisers,
				project_name: participation.project_name,
				project_date: participation.project_date,
				rid: participation.rid,
				members: participation.members,
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
			project_date: state.project_date,
			rid: state.rid,
			members: state.members,
		},
		validationSchema: ParticipationSchema,
		onSubmit: (values) => {
			const participation = {
				club: values.club,
				organisers: values.organisers,
				project_name: values.project_name,
				project_date: values.project_date,
				rid: values.rid,
				members: values.members,
			};

			const url = PARTICIPATIONS_API + '/participation';

			axios({
				method: isAdd ? 'POST' : 'PUT',
				url: isAdd ? url : url + '/' + id,
				data: participation
			}).then((response) => {
				//debugger;
				console.log(response.data);
				router.push('/participations');
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
						<div className="text-3xl font-sub-heading text-center">{(participation) ? 'Edit' : 'Add'} Participation</div>

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
										Project Date
									</label>
									<input onChange={formik.handleChange} value={formik.values.project_date} name="project_date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" placeholder="Project Date" />
									{formik.errors.project_date && formik.touched.project_date ? (
										<div className="text-red-700">{formik.errors.project_date}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Members
									</label>
									<input onChange={formik.handleChange} value={formik.values.members} name="members" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="No. of members" />
									{formik.errors.members && formik.touched.members ? (
										<div className="text-red-700">{formik.errors.members}</div>
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
