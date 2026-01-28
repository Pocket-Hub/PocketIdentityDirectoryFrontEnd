import { Link } from "react-router-dom";
import users from '../assets/users.png';
import groups from '../assets/groups.png'
import { useEffect } from "react";



function HomePage({ setPage }) {


    useEffect(() => {
        setPage(window.location.href)
    }, [])

    return (<div style={{ display: 'flex' }}>
        <Link className="tile" to='/Users'><div className="tile-div">User Management<img src={users}></img></div></Link>
        <Link className="tile" to='/Groups'><div className="tile-div">Group Management<img src={groups}></img></div></Link>
    </div >);
}


export default HomePage;