import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import api from './Api'
import Card from './Card';
import AlbumPage from './AlbumPage';

export default function Content(){
    return (
        <div className="flex-grow-1 rounded-3 bg-secondary p-4" style={{minHeight:0, overflowY:'auto'}} id="content">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/albums/:id" element={<AlbumPage />} />
            </Routes>
        </div>
    );
}
function Main(){
    const [contents, setContents] = useState([]);


    useEffect(() => {
        api.get('populate/')
            .then(res => {
                setContents(res.data);
            });
    }, []);

    return (
        <div className="container-fluid h-100" id="main-content" style={{minHeight:0}}>
            <div className='row' style={{minHeight:0}}>
                {contents.map((content) => (
                    <Card key={content.id} content={content} />
                ))}
            </div>
        </div>
    );
}