import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, FormGroup, FormLabel, FormControlLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import clubs from '../data/clubs.json';
import axios from 'axios';
//import PrimarySearchAppBar from './PrimarySearchAppBar';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
//import EnhancedTable from './EnhancedTableMeeting';
import { animateScroll as scroll } from 'react-scroll';
import { useRouter } from 'next/router';
import { MEMBERS_API } from '../urls';
import { handleImageUpload } from '../uploadFile';
import NavbarAdmin from '../../components/NavbarAdmin';
import { AccountContext } from '../../components/Account';
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';

const MemberSchema = Yup.object().shape({
	full_name: Yup.string().required('Required'),
	phone: Yup.string().required('Required').min(10).max(10, 'Phone no. must be 10 digits long.'),
	email: Yup.string().email().required('Required'),
	address: Yup.string().required('Required').max(300, 'Must be less than 300 characters.'),
	ri_id: Yup.string().required('Required').min(6).max(11),
	dob: Yup.date('Invalid date').required('Required'),
	doi: Yup.date('Invalid date').required('Required'),
	//gov_id_number: Yup.string().required('Required'),
	blood_group: Yup.string().required('Required'),
	occupation: Yup.string().required('Required'),
	previous_positions: Yup.string().required('Required'),
	current_positions: Yup.string().required('Required'),
	photo: Yup.string().url('Enter a valid URL').required('Required'),
	opt_insurance: Yup.boolean().required('Required'),
	gov_id_doc: Yup.string().when("opt_insurance", {
        is: true,
        then: Yup.string().required('Required'),
		else: Yup.string()
	}),
	nominee_name: Yup.string().when("opt_insurance", {
        is: true,
        then: Yup.string().required('Required')
	}),
	nominee_rel: Yup.string().when("opt_insurance", {
        is: true,
        then: Yup.string().required('Required')
	}),
	nominee_dob: Yup.string().when("opt_insurance", {
        is: true,
        then: Yup.string().required('Required')
	}),
	nominee_id_doc: Yup.string().when("opt_insurance", {
        is: true,
        then: Yup.string().required('Required')
	}),
});

export { AddEdit };

function AddEdit(props) {
	const member = props?.data;
	const id = member?.id;
	//debugger;
	const isAdd = !member;
	console.log(member);

	const router = useRouter();
	
	const [session, setSession] = useState();
	const [clubName, setClubName] = useState();
    const { getSession, logout } = useContext(AccountContext);

	const [state, setState] = useState({
		full_name: '',
		club: '',
		phone: '',
		email: '',
		address: '',
		dob: '',
		doi: '',
		ri_id: '',
		gov_id: '',
		gov_id_number: '',
		blood_group: '',
		occupation: '',
		previous_positions: '',
		current_positions: '',
		photo: '',
		gov_id_doc: '',
		opt_insurance: '',
		nominee_name: '',
		nominee_rel: '',
		nominee_dob: '',
		nominee_id_doc: ''
	});
  
    useEffect(() => {
        getSession().then((sessionData) => {
            setSession(sessionData);

			setClubName(sessionData['clubName']);
			setState(isAdd ? {
				full_name: '',
				club: sessionData['username'],
				phone: '',
				email: '',
				address: '',
				dob: '',
				doi: '',
				ri_id: '',
				gov_id: '',
				gov_id_number: '',
				blood_group: '',
				occupation: '',
				previous_positions: '',
				current_positions: '',
				photo: '',
				gov_id_doc: '',
				opt_insurance: '',
				nominee_name: '',
				nominee_rel: '',
				nominee_dob: '',
				nominee_id_doc: ''
			} : {
				full_name: member.full_name,
				club: member.club,
				phone: member.phone,
				email: member.email,
				address: member.address,
				dob: member.dob,
				doi: member.doi,
				ri_id: member.ri_id,
				gov_id: member.gov_id,
				gov_id_number: member.gov_id_number,
				blood_group: member.blood_group,
				occupation: member.occupation,
				previous_positions: member.previous_positions,
				current_positions: member.current_positions,
				photo: member.photo,
				gov_id_doc: (member.gov_id === 'Aadhar Card' ? member.gov_id_doc : ''),
				opt_insurance: member.opt_insurance,
				nominee_name: member.nominee_name,
				nominee_rel: member.nominee_rel,
				nominee_dob: member.nominee_dob,
				nominee_id_doc: member.nominee_id_doc,
			});
		}).catch((error) => {
			router.push('/admin');
		});
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			full_name: state.full_name,
			club: state.club,
			phone: state.phone,
			email: state.email,
			address: state.address,
			dob: state.dob,
			doi: state.doi,
			ri_id: state.ri_id,
			gov_id: state.gov_id,
			gov_id_number: state.gov_id_number,
			blood_group: state.blood_group,
			occupation: state.occupation,
			previous_positions: state.previous_positions,
			current_positions: state.current_positions,
			photo: state.photo,
			gov_id_doc: state.gov_id_doc,
			opt_insurance: state.opt_insurance,
			nominee_name: state.nominee_name,
			nominee_rel: state.nominee_rel,
			nominee_dob: state.nominee_dob,
			nominee_id_doc: state.nominee_id_doc
		},
		validationSchema: MemberSchema,
		onSubmit: (values) => {
			debugger;
			console.log(values);
			const member = {
				full_name: values.full_name,
				club: values.club,
				phone: values.phone,
				email: values.email,
				address: values.address,
				dob: values.dob,
				doi: values.doi,
				ri_id: values.ri_id,
				gov_id: values.gov_id,
				gov_id_number: values.gov_id_number,
				blood_group: values.blood_group,
				occupation: values.occupation,
				previous_positions: values.previous_positions,
				current_positions: values.current_positions,
				photo: values.photo,
				gov_id_doc: values.gov_id_doc,
				opt_insurance: values.opt_insurance,
				nominee_name: values.nominee_name || '',
				nominee_rel: values.nominee_rel || '',
				nominee_dob: values.nominee_dob || '',
				nominee_id_doc: values.nominee_id_doc || ''
			};

			const url = MEMBERS_API + '/member';

			debugger;
			axios({
				method: isAdd ? 'POST' : 'PUT',
				url: isAdd ? url : url + '/' + id,
				data: member
			}).then((response) => {
				//debugger;
				console.log(response.data);
				router.push('/members');
				//setSubmitLoading(false);
			}).catch((error) => {
					console.log(error);
			});
		}
	});

	const handleChange = (evt) => {
		debugger;
		const file = evt.target.files[0];
		if (file.type === "image/jpeg" ||
			file.type === "image/png") {
			handleImageUpload(file).then(x => {
				debugger;
				console.log(x);
				formik.setFieldValue(evt.target.name, x.Location);
			});
		}
	}

	useEffect(() => console.log(state), [state])

  	return (
        <>
            <NavbarAdmin session={session} />
			<div className="my-8" style={{ overflowX: 'hidden' }} >
			<Container>
				<Grid container direction="column" justify="center" alignItems="center">
					<Grid container xs={12} sm={6}>
						<div className="text-3xl font-sub-heading text-center">{(member) ? 'Edit' : 'Add'} Member</div>

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
										Full Name
									</label>
									<input onChange={formik.handleChange} value={formik.values.full_name} name="full_name"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text" placeholder="Full Name" />
									{formik.errors.full_name && formik.touched.full_name ? (
										<div className="text-red-700">{formik.errors.full_name}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Email Address
									</label>
									<input onChange={formik.handleChange} value={formik.values.email} name="email"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="email" placeholder="Email Address" />
									{formik.errors.email && formik.touched.email ? (
										<div className="text-red-700">{formik.errors.email}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										RI Membership ID
									</label>
									<input onChange={formik.handleChange} value={formik.values.ri_id} name="ri_id"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="number" placeholder="RI Membership ID" />
									{formik.errors.ri_id && formik.touched.ri_id ? (
										<div className="text-red-700">{formik.errors.ri_id}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Mobile No.
									</label>
									<input onChange={formik.handleChange} value={formik.values.phone} name="phone"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="number" placeholder="Mobile No." />
									{formik.errors.phone && formik.touched.phone ? (
										<div className="text-red-700">{formik.errors.phone}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Address
									</label>
									<input onChange={formik.handleChange} value={formik.values.address} name="address"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text" placeholder="Full Address with Postal Code" />
									{formik.errors.address && formik.touched.address ? (
										<div className="text-red-700">{formik.errors.address}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Occupation
									</label>
									<input onChange={formik.handleChange} value={formik.values.occupation} name="occupation"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text" placeholder="Occupation" />
									{formik.errors.occupation && formik.touched.occupation ? (
										<div className="text-red-700">{formik.errors.occupation}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Previous Positions Held
									</label>
									<input onChange={formik.handleChange} value={formik.values.previous_positions} name="previous_positions"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text" placeholder="Previous Positions Held" />
									{formik.errors.previous_positions && formik.touched.previous_positions ? (
										<div className="text-red-700">{formik.errors.previous_positions}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Current Positions Held
									</label>
									<input onChange={formik.handleChange} value={formik.values.current_positions} name="current_positions"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text" placeholder="Current Positions Held" />
									{formik.errors.current_positions && formik.touched.current_positions ? (
										<div className="text-red-700">{formik.errors.current_positions}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Date of Birth
									</label>
									<input onChange={formik.handleChange} value={formik.values.dob} name="dob"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="date" placeholder="Date of Birth" />
									{formik.errors.dob && formik.touched.dob ? (
										<div className="text-red-700">{formik.errors.dob}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Date of Induction
									</label>
									<input onChange={formik.handleChange} value={formik.values.doi} name="doi"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="date" placeholder="Date of Induction" />
									{formik.errors.doi && formik.touched.doi ? (
										<div className="text-red-700">{formik.errors.doi}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Blood Group
									</label>
									<select
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										name="blood_group"
										value={formik.values.blood_group}
										onChange={formik.handleChange}
									>
										<option value=''>Select Blood Group</option>
										<option value={'A +ve'}>A +ve</option>
										<option value={'A -ve'}>A -ve</option>
										<option value={'B +ve'}>B +ve</option>
										<option value={'B -ve'}>B -ve</option>
										<option value={'AB +ve'}>AB +ve</option>
										<option value={'AB -ve'}>AB -ve</option>
										<option value={'O +ve'}>O +ve</option>
										<option value={'O -ve'}>O -ve</option>
									</select>
									{formik.errors.blood_group && formik.touched.blood_group ? (
										<div className="text-red-700">{formik.errors.blood_group}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Photo (must be square cropped | upload jpg/png file only)
									</label>
									<input onChange={handleChange} name="photo"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="file" placeholder="Member's Poster" />
									{(formik.values.photo) ? <label class="underline text-gray-700 text-sm text-theme-blue"><a href={formik.values.photo} rel="noreferrer" target="_blank">Last Uploaded File</a></label> : null }
									{formik.errors.photo && formik.touched.photo ? (
										<div className="text-red-700">{formik.errors.photo}</div>
									) : null}
								</div>

								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Do you want to opt for Rotary Rotaract We Care Policy?
									</label>
									<select
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										name="opt_insurance"
										value={formik.values.opt_insurance}
										onChange={formik.handleChange}
									>
										<option value=''>Select Option</option>
										<option value={true}>Yes</option>
										<option value={false}>No</option>
									</select>
									{formik.errors.opt_insurance && formik.touched.opt_insurance ? (
										<div className="text-red-700">{formik.errors.opt_insurance}</div>
									) : null}
								</div>

								{(formik.values.opt_insurance === 'true') ?
									<>
										<div class="mb-4 inline-block relative w-full">
											<label class="block text-gray-700 text-sm font-bold mb-2">
												AADHAR Card Scan (upload jpg/png file only)
											</label>
											<input onChange={handleChange} name="gov_id_doc"
												class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												type="file" placeholder="Scanned Govt. ID" />
											{(formik.values.gov_id_doc) ? <label class="underline text-gray-700 text-sm text-theme-blue"><a href={formik.values.gov_id_doc} rel="noreferrer" target="_blank">Last Uploaded File</a></label> : null }
											{formik.errors.gov_id_doc && formik.touched.gov_id_doc ? (
												<div className="text-red-700">{formik.errors.gov_id_doc}</div>
											) : null}
										</div>
										<div class="mb-4 inline-block relative w-full">
											<label class="block text-gray-700 text-sm font-bold mb-2">
												Nominee Full Name
											</label>
											<input onChange={formik.handleChange} value={formik.values.nominee_name} name="nominee_name"
												class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												type="text" placeholder="Nominee Full Name" />
											{formik.errors.nominee_name && formik.touched.nominee_name ? (
												<div className="text-red-700">{formik.errors.nominee_name}</div>
											) : null}
										</div>
										<div class="mb-4 inline-block relative w-full">
											<label class="block text-gray-700 text-sm font-bold mb-2">
												Relationship with Nominee
											</label>
											<input onChange={formik.handleChange} value={formik.values.nominee_rel} name="nominee_rel"
												class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												type="text" placeholder="Relationship with Nominee" />
											{formik.errors.nominee_rel && formik.touched.nominee_rel ? (
												<div className="text-red-700">{formik.errors.nominee_rel}</div>
											) : null}
										</div>
										<div class="mb-4 inline-block relative w-full">
											<label class="block text-gray-700 text-sm font-bold mb-2">
												Nominee's Date of Birth
											</label>
											<input onChange={formik.handleChange} value={formik.values.nominee_dob} name="nominee_dob"
												class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												type="date" placeholder="Date of Birth" />
											{formik.errors.nominee_dob && formik.touched.nominee_dob ? (
												<div className="text-red-700">{formik.errors.nominee_dob}</div>
											) : null}
										</div>
										<div class="mb-4 inline-block relative w-full">
											<label class="block text-gray-700 text-sm font-bold mb-2">
												Nominee AADHAR Card Scan (upload jpg/png file only)
											</label>
											<input onChange={handleChange} name="nominee_id_doc"
												class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												type="file" placeholder="Scanned AADHAR Card of Nominee" />
											{(formik.values.nominee_id_doc) ? <label class="underline text-gray-700 text-sm text-theme-blue"><a href={formik.values.nominee_id_doc} rel="noreferrer" target="_blank">Last Uploaded File</a></label> : null }
											{formik.errors.nominee_id_doc && formik.touched.nominee_id_doc ? (
												<div className="text-red-700">{formik.errors.nominee_id_doc}</div>
											) : null}
										</div>
									</>
									: null
								}

								<div class="inline-block relative w-full">
									<button className="bg-theme-blue text-theme-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
								</div>

								{/*<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Govt. ID Card
									</label>
									<select
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										name="gov_id"
										value={formik.values.gov_id}
										onChange={formik.handleChange}
									>
										<option value=''>Select Govt. ID Card</option>
										<option value={'Aadhar Card'}>Aadhar Card</option>
										<option value={'Driving License'}>Driving License</option>
										<option value={'Passport'}>Passport</option>
										<option value={'Voter Card'}>Voter Card</option>
										<option value={'Institution ID Card'}>College/University ID Card (For Institution based clubs only)</option>
									</select>
									{formik.errors.gov_id && formik.touched.gov_id ? (
										<div className="text-red-700">{formik.errors.gov_id}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Govt. ID No.
									</label>
									<input onChange={formik.handleChange} value={formik.values.gov_id_number} name="gov_id_number"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text" placeholder="Govt. ID Number" />
									{formik.errors.gov_id_number && formik.touched.gov_id_number ? (
										<div className="text-red-700">{formik.errors.gov_id_number}</div>
									) : null}
								</div>
								<div class="mb-4 inline-block relative w-full">
									<label class="block text-gray-700 text-sm font-bold mb-2">
										Govt. ID Scan (upload jpg/png file only)
									</label>
									<input onChange={handleChange} name="gov_id_doc"
										class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="file" placeholder="Scanned Govt. ID" />
									{(formik.values.gov_id_doc) ? <label class="underline text-gray-700 text-sm text-theme-blue"><a href={formik.values.gov_id_doc} rel="noreferrer" target="_blank">Last Uploaded File</a></label> : null }
									{formik.errors.gov_id_doc && formik.touched.gov_id_doc ? (
										<div className="text-red-700">{formik.errors.gov_id_doc}</div>
									) : null}
								</div>*/}
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
