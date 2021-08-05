import {Link} from 'react-router-dom';

export default function ButtonStart(){
    return(
        <div>
            <button>
                <Link to={'/register'}>Comencemos</Link>
            </button>
        </div>
    )
}