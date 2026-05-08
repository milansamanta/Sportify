import { Link } from 'react-router-dom';

export default function Card(props){
    return (
    <>
        <Link className='col-3' to={'/albums/' + props.content.id} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card" >
            <img src={props.content.cover} className="card-img-top" alt={props.content.title} />
            <div className="card-body">
                <h6 className="card-title m-0">{props.content.title}</h6>
                <p className="card-text">{props.content?.artist?.name}</p>
            </div>
        </div>
        </Link>
    </>
    );
}