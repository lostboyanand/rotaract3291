import axios from 'axios';
import { AddEdit } from '../../../components/members';
import { MEMBERS_API } from '../../../components/urls';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const member = await axios.get(MEMBERS_API + '/member/' + params.id);

    console.log(member.data);
    const data = member.data;

    return {
        props: { data }
    }
}