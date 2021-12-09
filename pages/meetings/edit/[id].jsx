import React from 'react';
import { useEffect, useState } from 'react';
import { Container, TextField, Button, Grid, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, FormGroup, FormLabel, FormControlLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import clubs from '../../../components/data/clubs.json';
import axios from 'axios';
//import PrimarySearchAppBar from './PrimarySearchAppBar';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
//import EnhancedTable from './EnhancedTableMeeting';
import { animateScroll as scroll } from 'react-scroll';
import { AddEdit } from '../../../components/meetings';
import { MEETINGS_API } from '../../../components/urls';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const meeting = await axios.get(MEETINGS_API + '/meeting/' + params.id);

    console.log(meeting.data);
    const data = meeting.data;
    //debugger;

    return {
        props: { data }
    }
}