import './ProjectCard.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import TwitterLikeButton from 'twitter-like-button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


function ProjectCard({project}) {
    const [likes, setLikes] = useState([])
    const [confirmDeleteCard, setConfirmDeleteCard] = useState(false)

    function handleLike() {
        
    }

    function handleDelete() {
        setConfirmDeleteCard(true)
    }

    function handleConfirmDelete() {

    }

    function handleCancelDelete() {
        setConfirmDeleteCard(false)
    }

    return (
        <>
        {!confirmDeleteCard &&
            <div className="project-card">
                    <div className="card-top">
                        <img className="card-thumbnail" src={project.imageUrl} alt={`${project.name} Thumbnail`}/>
                    </div>
                    <div className="card-middle">
                        <div className="card-top-section-container">
                            <h1 className="card-lg-text">
                                {project.name.toUpperCase()}
                            </h1>
                            <div className="title-icons">
                                {project.githubRepo && 
                                    <a href={project.githubRepo} target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon className="card-github-icon" icon={faGithub} />        
                                    </a>    
                                }
                                {project.owner.email === window.localStorage.getItem('Email') && 
                                    <FontAwesomeIcon 
                                        className="trash-icon" 
                                        icon={faTrashCan} 
                                        onClick={handleDelete}
                                    />
                                }
                            </div>
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
                        <TwitterLikeButton onClick={handleLike}/>
                    </div>
                </div>

            }
            {confirmDeleteCard &&
                <div className="project-card">
                    <div className="confirm-delete-card">
                        <div className="confirm-btn  yes-btn">
                            <h3 className="card-lg-text">YES</h3>
                        </div>
                        <div className="delete-question">
                            <h1 className="card-delete-question-text">DELETE {project.name.toUpperCase()}?</h1>
                        </div>
                        <div className="confirm-btn no-btn" onClick={handleCancelDelete}>
                            <h3 className="card-lg-text">NO</h3>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ProjectCard;