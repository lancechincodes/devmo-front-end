import './ProjectCard.css'
import axios from 'axios'
import { useEffect } from 'react';

function ProjectCard() {

    useEffect(() => {
        axios.get('http://localhost:8000/api/projects')
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="project-card">
            <div className="card-top"></div>
            <div className="card-middle">
                <h1 className="card-lg-text"></h1>
                <p className="card-sm-text"></p>
                <p className="card-sm-text">BUILT BY:</p>
                <p className="card-md-text"></p>
                <p className="card-sm-text">BUILT WITH:</p>
                <p className="card-md-text"></p>
            </div>
            <hr/>
            <div className="card-bottom">
                <h1 className="card-lg-text"></h1>
                <div className="demo-btn">DEMO</div>
            </div>
        </div>
    );
};

export default ProjectCard;