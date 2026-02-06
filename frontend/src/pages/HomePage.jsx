import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { IconsContext } from "../App";
import GroupsIcon from '../assets/groups.png'



function HomePage({ setPage }) {
    const { UsersIcon } = useContext(IconsContext);


    useEffect(() => {
        setPage(window.location.href)
    }, [])

    return (<div style={{ display: 'flex' }}>
        <Link className="tile" to='/Users'><div className="tile-div">User Management<img src={UsersIcon}></img></div></Link>
        <Link className="tile" to='/Groups'><div className="tile-div">Group Management<img src={GroupsIcon}></img></div></Link>
    </div >);
}


export default HomePage;