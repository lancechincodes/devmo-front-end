import './ProjectCard.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import TwitterLikeButton from 'twitter-like-button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function ProjectCard({project}) {

    return (
        <div className="project-card">
            <div className="card-top">
                <img className="card-thumbnail" src={project.imageUrl} alt={`${project.name} Thumbnail`}/>
            </div>
            <div className="card-middle">
                <div className="card-top-section-container">
                    <h1 className="card-lg-text">
                        {project.name.toUpperCase()}
                    </h1>
                    {project.githubRepo && 
                        <a href={project.githubRepo} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon className="card-github-icon" icon={faGithub} />        
                        </a>    
                    }
                </div>

                <div className="card-section-container">
                    <p className="card-sm-text">
                        {project.description.toUpperCase()}
                    </p>
                </div>

                <div className="card-section-container">
                    <p className="card-sm-text">BUILT BY:</p>
                    <p className="card-md-text">
                        {project.owner.firstName.toUpperCase() + ' ' + project.owner.lastName.toUpperCase()}
                    </p>
                </div>

                <div className="card-section-container">
                    <p className="card-sm-text">BUILT WITH:</p>
                    <div className="card-tech-chips">
                        {project.technologies.map((tech, idx) => (
                            <div key={idx} className="card-tech-chip">
                                {idx !== project.technologies.length - 1 
                                    ? <p className="card-md-text">{tech.toUpperCase()},&nbsp;&nbsp;</p> 
                                    : <p className="card-md-text">{tech.toUpperCase()}</p> 
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr/>
            <div className="card-bottom">
                <h1 className="card-lg-text card-number">#1</h1>
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    <div className="demo-btn">
                        <p className="card-sm-text">DEMO</p>
                    </div>
                </a>
                <TwitterLikeButton/>
            </div>
        </div>
    );
};

export default ProjectCard;