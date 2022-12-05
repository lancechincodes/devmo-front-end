import './ProjectCard.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import Heart from "react-heart"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { faPen, faTrash, faCaretUp, faCaretDown, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

function ProjectCard({project}) {
    const [isActive, setIsActive] = useState(null) // this isActive/setIsActive is for the heart like button
    const [updatedLikes, setUpdatedLikes] = useState(project.likes)
    const [showUpdateDelete, setShowUpdateDelete] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                const usersArr = res.data
                const loggedOnUser = usersArr.find(user => user.email === window.localStorage.getItem('Email')) 
                axios.get(`http://localhost:8000/api/users/${loggedOnUser._id}`)
                    .then(res => {
                        let likedBefore
                        if (res.data.likedProjects.includes(project._id)) {
                            likedBefore = true
                        }
                        else {
                            likedBefore = false
                        }
                        setIsActive(likedBefore)
                    })
                })                
    }, [])

    useEffect(() => {
         // Set new popularity rank when like occurs
         axios.get('http://localhost:8000/api/projects')
         .then(res => {
             const allProjects = res.data
             const rankedProjects = allProjects.sort((a,b) => (a.likes < b.likes) ? 1 : -1)
             axios.patch('http://localhost:8000/api/projects/popularity', {
                 'rankedProjects': rankedProjects
             }) 
                 .then(res => {
                    //  console.log(res)
                 })
                 .catch(err => console.log(err))
         })
         .catch(err => console.log(err))
    }, [isActive])

    function handleLike() {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                const usersArr = res.data
                const loggedOnUser = usersArr.find(user => user.email === window.localStorage.getItem('Email')) 
                axios.patch(`http://localhost:8000/api/projects/likeProject/${project._id}/${loggedOnUser._id}`)
                    .then(res => {
                        // console.log(res)
                        setUpdatedLikes(res.data.likes)
                    })
                    .then(() => {
                        setIsActive(!isActive)
                    })
            })
            .catch(err => console.log(err))
    }

    function handleShowUpdateDelete() {
        setShowUpdateDelete(!showUpdateDelete)
    }

    function handleNavigateUpdate() {
        window.localStorage.setItem("Form", "Update")
    }

    function handleToggleDeleteProject() {
        setConfirmDelete(!confirmDelete)
    }

    function handleDeleteProject() {
        axios.delete(`http://localhost:8000/api/projects/${project._id}`)
            .then(() => {
                navigate('/gallery')
            })
    }
    
    return (
        <div className="project-card">
            <div className="card-top">
                <img 
                    className="card-thumbnail" 
                    src={project.imageUrl} 
                    alt={`${project.name} Thumbnail`}
                />
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

   
                {project.owner.email === window.localStorage.getItem('Email') &&
                    <div className="show-hide-icon-div">
                      <FontAwesomeIcon
                          className="show-hide-icon"
                          icon={!showUpdateDelete ? faCaretDown : faCaretUp}
                          onClick={handleShowUpdateDelete}
                      />
                    </div>  
                }

            </div>
            <hr/>
            {!showUpdateDelete &&
                <div className="card-bottom">
                    <h1 className="card-lg-text card-number">#{project.popularity}</h1>
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        <div className="demo-btn">
                            <p className="card-sm-text">DEMO</p>
                        </div>
                    </a>
                    <div className="likes-container">
                        <p className="card-md-text">{updatedLikes}</p>
                        <Heart 
                            className="heart-icon" 
                            isActive={isActive} 
                            onClick={handleLike}
                            inactiveColor={window.localStorage.getItem('Theme') === 'dark' ? 'white' : 'black'}
                            activeColor={'red'}
                        />
                    </div>
                </div>
            }
            {showUpdateDelete && !confirmDelete &&
                <div className="card-bottom">
                    <div className="card-user-container">
                        <Link to='/form' onClick={handleNavigateUpdate} state={{ project: project}}>
                            <div className="card-user-btn">
                                <FontAwesomeIcon 
                                    className="update-delete-icon" 
                                    icon={faPen} 
                                />
                                <p className="card-sm-text">EDIT</p>
                            </div>
                        </Link>
                        <div className="card-user-btn" onClick={handleToggleDeleteProject}>
                            <FontAwesomeIcon 
                                className="update-delete-icon" 
                                icon={faTrash} 
                            />
                            <p className="card-sm-text">DELETE</p>
                        </div>
                    </div>
                </div>
            }
            {showUpdateDelete && confirmDelete && 
                <div className="card-bottom">
                    <p className="card-md-text">DELETE PROJECT?</p>
                    <div className="card-user-btn" onClick={handleDeleteProject}>
                        <FontAwesomeIcon className="update-delete-icon" icon={faCheck} />        
                        <p className="card-sm-text">YES</p>
                    </div>
                    <div className="card-user-btn" onClick={handleToggleDeleteProject}>
                        <FontAwesomeIcon className="update-delete-icon" icon={faXmark} />        
                        <p className="card-sm-text">NO</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProjectCard;