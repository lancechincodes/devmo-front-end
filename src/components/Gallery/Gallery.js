import './Gallery.css'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../DataContext'
import TopNav from '../TopNav/TopNav';
import ProjectCard from '../ProjectCard/ProjectCard';
import axios from 'axios'

function Gallery() {
    const { isActive, display } = useContext(DataContext)
    const [name, setName] = useState('')
    const [profileProjects, setProfileProjects] = useState([])
    const [totalTechnologies, setTotalTechnologies] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                const usersArr = res.data
                const loggedOnUser = usersArr.find(user => user.email === window.localStorage.getItem('Email'))
                setName(loggedOnUser.firstName.toUpperCase() + ' ' + loggedOnUser.lastName.toUpperCase())
                const loggedOnUserId = loggedOnUser.id

                axios.get(`http://localhost:8000/api/projects/${loggedOnUserId}`)
                    .then(res => {
                        setProfileProjects(res.data)

                        // determine how many number of unique technologies used for all projects
                        let hash = {}
                        for (let project of profileProjects) {
                            for (let technology of project.technologies) {
                                !hash[technology] ? hash[technology] = 1 : hash[technology]++
                            }
                        }
                        setTotalTechnologies(Object.values(hash).length)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    },[profileProjects, totalTechnologies]) // re-mount if either of these states update

    return (
        <div className="gallery-page">
            <TopNav/>
            <div className="gallery-main">

                {display === 'Featured' && 
                    <div className="gallery-heading">
                        <h1 className="gallery-title">FEATURED</h1>
                        <p className="gallery-description">Our editors' top picks.</p>
                    </div>
                }

                {display === 'Discover' && 
                    <div className="gallery-heading">
                        <h1 className="gallery-title">DISCOVER</h1>
                        <p className="gallery-description">Our newest showcase.</p>
                    </div>
                }

                {display === 'Profile' && 
                    <div className="gallery-heading">
                        <h1 className="gallery-title">{name}</h1>
                        <p className="gallery-description">{profileProjects.length} Projects. {totalTechnologies} Technologies.</p>
                    </div>
                }
                <ProjectCard/>
            </div>
        </div>
    );
};

export default Gallery;