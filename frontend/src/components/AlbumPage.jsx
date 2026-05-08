import {useParams} from "react-router-dom";
import {useState, useEffect} from 'react'
import api from './Api'

export default function AlbumPage(){
    const {id} = useParams();
    const [album, setAlbum] = useState({});
    useEffect(() => {
        api.get('albums/' + id)
            .then(res => {
                setAlbum(res.data);
            });
    }, [id]);
    return (
        <div className="h-100 d-flex flex-column" id="main-content" style={{minHeight:0}}>
            <div className="row justify-content-center">
            <div className="col-4">
                <img className="img-fluid" src={album.cover} alt={album.title} />
                <h2 className="text-white text-center">{album.title}</h2>
                <p className="text-white text-center">{'by '+album.artist?.name || 'Unknown Artist'}</p>
                
            </div>
            </div>
            <div className="container mt-4">
                {album.tracks?.map(track => (
                    <p className="text-white bg-dark p-1 mb-1" key={track.id}>
                        <button className="btn btn-primary me-2" onClick={() => handlePlay(track.preview)}>
                            Play
                        </button>
                        <span>{track.title}</span>
                    </p>
                ))}
            </div>
        </div>
    );
}
