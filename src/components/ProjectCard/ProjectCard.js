import './ProjectCard.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import Heart from "react-heart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ProjectCard({project, heartButton}) {
    const [confirmDeleteCard, setConfirmDeleteCard] = useState(false)
    const [isActive, setIsActive] = useState(false) // this isActive/setIsActive is for the heart like button

    function handleLike() {
        setIsActive(!isActive)
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                const usersArr = res.data
                const loggedOnUser = usersArr.find(user => user.email === window.localStorage.getItem('Email')) 
                axios.patch(`http://localhost:8000/api/projects/likeProject/${project._id}/${loggedOnUser._id}`)
                    .then(res => {
                        console.log(res)
                    })
            })
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
        <div className="project-card">
            <div className="card-top">
                <img className="card-thumbnail" src={project.imageUrl} alt={`${project.name} Thumbnail`}/>
            </div>
            <div className="card-middle">
                {}
                <div className="card-top-section-container">
                    <h1 className="card-lg-text">
                        {project.name.toUpperCase()}
                    </h1>
                    <div className="title-icons">
                        {project.githubRepo && 
                            <a href={project.githubRepo} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon className="card-github-icon" icon={faGithubAlt} />        
                            </a>    
                        }
                        {/* {project.owner.email === window.localStorage.getItem('Email') && 
                            <FontAwesomeIcon 
                                className="trash-icon" 
                                icon={faTrash} 
                                onClick={handleDelete}
                            />
                        } */}
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
                <Heart 
                    className="heart-icon" 
                    isActive={isActive} 
                    onClick={handleLike}
                    inactiveColor={'black'}
                    activeColor={'red'}
                />
            </div>
        </div>
    );
};

export default ProjectCard;