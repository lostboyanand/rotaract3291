
import axios from 'axios';
import { AddEdit } from '../../../components/participations';
import { PARTICIPATIONS_API } from '../../../components/urls';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const participation = await axios.get(PARTICIPATIONS_API + '/participation/' + params.id);

    console.log(participation.data);
    const data = participation.data;
    //debugger;

    return {
        props: { data }
    }
}