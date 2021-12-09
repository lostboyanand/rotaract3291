import { Club } from '../../components/clubs';
import ClubDetails from '../../components/data/club_details.json';

export default Club;

export async function getServerSideProps({ params }) {
    
    debugger;
    const data = ClubDetails.find(club => club.alias === params.id);
    console.log(data);

    return {
        props: { data }
    }
}