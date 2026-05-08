import {useState} from "react";

export default function Player(){
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);

    function togglePlay(){
        if(isPlaying){
            currentTrack.pause();
        }else{
            currentTrack.play();
        }
        setIsPlaying(!isPlaying);
    }

    function loadTrack(previewUrl){
        const audio = new Audio(previewUrl);
        setCurrentTrack(audio);
    }

    return (
        <div className="align-items-center justify-content-between bg-dark text-white h-100" id="player">
            player
        </div>
    );
}
