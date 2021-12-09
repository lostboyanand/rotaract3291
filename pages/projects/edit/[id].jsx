import axios from 'axios';
import { AddEdit } from '../../../components/projects';
import { PROJECTS_API } from '../../../components/urls';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const project = await axios.get(PROJECTS_API + '/project/' + params.id);

    console.log(project.data);
    const data = project.data;
    //debugger;

    return {
        props: { data }
    }
}