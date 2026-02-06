import { Link } from "react-router-dom";




function ErrorPage() {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h1>Sorry, this resource does not exist.</h1>
            <Link to="/"><button>Home</button></Link>
        </div>
    );
}

export default ErrorPage;