import { Link } from "react-router-dom";



function HomePage() {



    return (<div style={{display: 'flex'}}>
        <Link className="tile" to='/Users'><div className="tile-div">User Management<img src="src/assets/users.png"></img></div></Link>
        <Link className="tile" to='/Groups'><div className="tile-div">Group Management<img src="src/assets/groups.png"></img></div></Link>
    </div >);
}


export default HomePage;