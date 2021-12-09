import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, MenuItem, FormGroup, FormLabel, FormControlLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import clubs from '../data/clubs.json';
import axios from 'axios';
import { useRouter } from 'next/router';
import { MEETINGS_API, MEMBERS_API } from '../urls';
import Multiselect from 'multiselect-react-dropdown';
import NavbarAdmin from '../../components/NavbarAdmin';
import { AccountContext } from '../../components/Account';
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

const MeetingSchema = Yup.object().shape({
	meeting_type: Yup.string().required('Required'),
	venue: Yup.string().required('Required'),
	meeting_date: Yup.date('Invalid date').required('Required'),
	members: Yup.array().required(),
	rotarians: Yup.number().required('Required').integer(),
	guests: Yup.number().required('Required').integer(),
	media: Yup.string().url('Enter a valid URL').required('Required'),
	participating_clubs: Yup.string(),
});

export { AddEdit };

function AddEdit(props) {
	const meeting = props?.data;
	const id = meeting?.id;

	const isAdd = !meeting;
	console.log(meeting);

	const [loading, setLoading] = useState(true);
	const [clubMembers, setClubMembers] = useState([]);

	const [state, setState] = useState({
		club: '',
		meeting_type: '',
		venue: '',
		meeting_date: '',
		members: '',
		rotarians: '',
		guests: '',
		participating_clubs: '',
	});

	const router = useRouter();
	const [session, setSession] = useState();
	const [clubName, setClubName] = useState();
    const { getSession, logout } = useContext(AccountContext);
  
    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);

			setClubName(sessionData['clubName']);
			axios.get(MEMBERS_API + '/members-by-club/' + sessionData['username']).then(m => {
				//debugger;
				for (let i = 0; i<m.data.length; i++)
					clubMembers.push({value: m.data[i].id, label: m.data[i].full_name});
				console.log(clubMembers);
				setState(
					isAdd ? {
						club: sessionData['username'],
						meeting_type: 'RGM',
						venue: '',
						meeting_date: '',
						members: '',
						rotarians: '',
						guests: '',
						participating_clubs: '',
						media: ''
					} : {
						club: meeting.club,
						meeting_type: meeting.meeting_type,
						venue: meeting.venue,
						meeting_date: meeting.meeting_date,
						members: meeting.members,
						rotarians: meeting.rotarians,
						guests: meeting.guests,
						participating_clubs: meeting.participating_clubs,
						media: meeting.media
					}
				);
				setLoading(false);
			});
		}).catch((error) => {
			router.push('/admin');
		});
	}, []);
	
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			club: state.club,
			meeting_type: state.meeting_type,
			venue: state.venue,
			meeting_date: state.meeting_date,
			members: state.members,
			rotarians: state.rotarians,
			guests: state.guests,
			participating_clubs: state.participating_clubs,
			media: state.media
		},
		validationSchema: MeetingSchema,
		onSubmit: (values) => {
			const meeting = {
				club: values.club,
				meeting_type: values.meeting_type.toString(),
				venue: values.venue,
				meeting_date: values.meeting_date,
				members: values.members,
				rotarians: values.rotarians,
				guests: values.guests,
				participating_clubs: values.participating_clubs,
				media: values.media
			};
			
			const url = MEETINGS_API + '/meeting';
			
			debugger;
			axios({
				method: isAdd ? 'POST' : 'PUT',
				url: isAdd ? url : url + '/' + id,
				data: meeting
			}).then((response) => {
				debugger;
				console.log(response.data);
				router.push('/meetings');
				//setSubmitLoading(false);
			}).catch((error) => {
				debugger;
				console.log(error);
			});
		}
	});

	const onChangeOption = (selectedOption) => {
		console.log(selectedOption);
		formik.setFieldValue("members", selectedOption);
	}

  	return (
        <>
            <NavbarAdmin session={session} />
			<div className="my-8" style={{ overflowX: 'hidden' }} >
			<Container>
				<Grid container direction="column" justify="center" alignItems="center">
					<Grid container xs={12} sm={6}>
						<div className="text-3xl font-sub-heading text-center">{(meeting) ? 'Edit' : 'Add'} Meeting</div>

						
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
										Meeting Type
									</label>
									<select
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										name="meeting_type"
										value={formik.values.meeting_type}
										onChange={formik.handleChange}
									>
										<option value={'RGM'}>RGM</option>
										<option value={'Board Meeting'}>Board Meeting</option>
										<option value={'Joint Meeting'}>Joint Meeting</option>
									</select>
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Meeting Venue
									</label>
									<input onChange={formik.handleChange} value={formik.values.venue} name="venue"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text" placeholder="Meeting Venue" />
									{formik.errors.venue && formik.touched.venue ? (
										<div className="text-red-700">{formik.errors.venue}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Meeting Date
									</label>
									<input onChange={formik.handleChange} value={formik.values.meeting_date} name="meeting_date"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="date" />
									{formik.errors.meeting_date && formik.touched.meeting_date ? (
										<div className="text-red-700">{formik.errors.meeting_date}</div>
									) : null}
								</div>
								{
									(loading) ? null :
									<div class="mb-4 inline-block relative w-full">
										<label class="block text-gray-700 text-sm font-bold mb-2">
											Participating Members
										</label>
										<Select
											isMulti
											onChange={onChangeOption}
											value={formik.values.members}
											name="members"
											options={clubMembers}
											className="basic-multi-select"
											classNamePrefix="select"
										/>
										{formik.errors.members && formik.touched.members ? (
											<div className="text-red-700">{formik.errors.members}</div>
										) : null}
									</div>
								}
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Rotarians Present
									</label>
									<input onChange={formik.handleChange} value={formik.values.rotarians} name="rotarians" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="No. of Rotarians" />
									{formik.errors.rotarians && formik.touched.rotarians ? (
										<div className="text-red-700">{formik.errors.rotarians}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Guests Present
									</label>
									<input onChange={formik.handleChange} value={formik.values.guests} name="guests" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="No. of Guests" />
									{formik.errors.guests && formik.touched.guests ? (
										<div className="text-red-700">{formik.errors.guests}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Photos/Video Link
									</label>
									<input onChange={formik.handleChange} value={formik.values.media} name="media" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="url" placeholder="Photos/Videos Link" />
									{formik.errors.media && formik.touched.media ? (
										<div className="text-red-700">{formik.errors.media}</div>
									) : null}
								</div>
								{(formik.values.meeting_type === 'Joint Meeting') ?
									<div class="mb-4 inline-block relative w-full">
										<label class="block text-gray-700 text-sm font-bold mb-2">
											Participating Clubs
										</label>
										<input onChange={formik.handleChange} value={formik.values.participating_clubs} name="participating_clubs"
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											type="text" placeholder="Participating Club with RID" />
										{formik.errors.participating_clubs && formik.touched.participating_clubs ? (
											<div className="text-red-700">{formik.errors.participating_clubs}</div>
										) : null}
									</div>
									: null
								}
								<div class="inline-block relative w-full">
									<button className="bg-theme-blue text-theme-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
								</div>
							</form>
						</div>

					</Grid>
				</Grid>
			</Container>
		</div>
	</>
	);
}
