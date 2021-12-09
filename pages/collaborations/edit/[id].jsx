
import axios from 'axios';
import { AddEdit } from '../../../components/collaborations';
import { COLLABORATIONS_API } from '../../../components/urls';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const collaboration = await axios.get(COLLABORATIONS_API + '/collaboration/' + params.id);

    console.log(collaboration.data);
    const data = collaboration.data;
    //debugger;

    return {
        props: { data }
    }
}