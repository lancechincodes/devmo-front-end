import './ProjectCard.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
// import Heart from 'react-animated-heart'
import TwitterLikeButton from 'twitter-like-button'



function ProjectCard({project}) {
    

    return (
        <div className="project-card">
            <div className="card-top">
                <img className="card-thumbnail" src={project.imageUrl} alt={`${project.name} Thumbnail`}/>
            </div>
            <div className="card-middle">
                <h1 className="card-lg-text">
                    {project.name.toUpperCase()}
                </h1>
                <p className="card-sm-text">
                    {project.description.toUpperCase()}
                </p>
                <p className="card-sm-text">BUILT BY:</p>
                <p className="card-md-text">
                    {project.owner.firstName.toUpperCase() + ' ' + project.owner.lastName.toUpperCase()}
                </p>
                <p className="card-sm-text">BUILT WITH:</p>
                {project.technologies.map((tech) => (
                    <div key={tech} className="card-md-text">
                        {tech.toUpperCase()}
                    </div>
                ))}
            </div>
            <hr/>
            <div className="card-bottom">
                <h1 className="card-lg-text">#1</h1>
                <div className="demo-btn">DEMO</div>
                {/* <Heart/> */}
                <TwitterLikeButton/>
            </div>
        </div>
    );
};

export default ProjectCard;