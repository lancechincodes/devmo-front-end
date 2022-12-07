import './Gallery.css'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../DataContext'
import TopNav from '../TopNav/TopNav';
import ProjectCard from '../ProjectCard/ProjectCard';
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

function Gallery() {
    const { isActive } = useContext(DataContext)
    const [name, setName] = useState('')
    const [profileProjects, setProfileProjects] = useState([])
    const [totalTechnologies, setTotalTechnologies] = useState()
    const [totalLikes, setTotalLikes] = useState()
    const [featuredProjectsArr, setFeaturedProjectsArr] = useState([])
    const [discoverProjectsArr, setDiscoverProjectsArr] = useState([])
    const [profileProjectsArr, setProfileProjectsArr] = useState([])
    const [favoritesProjectsArr, setFavoritesProjectsArr] = useState([])

    // Set name and total technologies of logged on user
    useEffect(() => {
        if (window.localStorage.getItem('Display') === 'Profile') {
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
        }
    },[totalTechnologies]) // re-mount if state updates

    // Set discover and profile projects
    useEffect(() => {
        if (window.localStorage.getItem('Display') === 'Discover' || window.localStorage.getItem('Display') === 'Profile')
            axios.get('http://localhost:8000/api/projects')
                .then(res => {
                    // console.log(res.data)
                    const allProjects = res.data
                    if (allProjects.length > 0) {
                        const discoverProjects = allProjects.reverse()
                        setDiscoverProjectsArr(discoverProjects)

                        const profileProjects = allProjects.filter(project => project.owner.email === window.localStorage.getItem('Email'))
                        setProfileProjectsArr(profileProjects)
                        
                        // set total likes for logged on user
                        let likes = 0
                        for (let project of profileProjects) {
                            likes += project.likes
                        }
                        setTotalLikes(likes)
                    }
                })
                .catch(err => console.log(err))
    }, [])

    // Set featured projects
    // .sort was altering res.data in place so I opted to separate the discoverProjects and featuredProjects logic into 2 useEffects
    useEffect(() => { 
        if (window.localStorage.getItem('Display') === 'Featured') {
            axios.get('http://localhost:8000/api/projects')
                .then(res => {
                    // console.log(res.data)
                    const allProjects2 = res.data
                    if (allProjects2.length > 0) {
                        const featuredProjects = allProjects2.sort((a,b) => (a.likes < b.likes) ? 1 : -1)
                        setFeaturedProjectsArr(featuredProjects)
                    }
                })
                .catch(err => console.log(err))
        }
    }, [])

    // Set favorite projects
    // filter only liked projects by the logged on user
    useEffect(() => {
        if (window.localStorage.getItem('Display') === 'Favorites') {
            // 1) get all project ids liked by the user
            axios.get('http://localhost:8000/api/users')
                .then(res => {
                    const usersArr = res.data
                    const loggedOnUser = usersArr.find(user => user.email === window.localStorage.getItem('Email'))
                    const loggedOnUserId = loggedOnUser.id
                    axios.get(`http://localhost:8000/api/users/${loggedOnUserId}`)
                        .then(res => {
                            const likedProjectIds = res.data.likedProjects
                            
                            if (likedProjectIds.length > 0) {
                                // 2) get all projects and find liked ones
                                axios.get('http://localhost:8000/api/projects')
                                    .then(res => {
                                        // console.log(res.data)
                                        const allProjects3 = res.data
                                        let likedProjects = []
                                        for (let projectId of likedProjectIds) {
                                            let targetProject = allProjects3.find(project => project._id === projectId)
                                            if (targetProject) likedProjects.push(targetProject)
                                        }
                                        likedProjects = likedProjects.reverse()
                                        setFavoritesProjectsArr(likedProjects)
                                    })
                                    .catch(err => console.log(err))
                            }

                        })
                        .catch(err => console.log(err))
                    })
                .catch(err => console.log(err))
        }
    }, [])

    return (
        <div className="gallery-page">
            <TopNav/>
            <div className="gallery-main">
                {window.localStorage.getItem('Display') === 'Featured' && 
                    <>
                        <div className="gallery-heading">
                            <h1 className="gallery-title">FEATURED</h1>
                            <p className="gallery-description">Our top-rated picks.</p>

                        </div>
                        <Swiper
                            direction={"horizontal"}
                            slidesPerView={1}
                            spaceBetween={30}
                            grabCursor={true}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >   
                            {featuredProjectsArr !== [] && featuredProjectsArr.map((project, idx) => (
                                <SwiperSlide className="swiper-slide" key={idx}>
                                    <ProjectCard key={idx} project={project}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                }

                {window.localStorage.getItem('Display') === 'Discover' && 
                    <>
                        <div className="gallery-heading">
                            <h1 className="gallery-title">DISCOVER</h1>
                            <p className="gallery-description">Our newest showcase.</p>
                        </div>
                        <Swiper
                            direction={"horizontal"}
                            slidesPerView={1}
                            spaceBetween={30}
                            grabCursor={true}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >   
                            {discoverProjectsArr !== [] && discoverProjectsArr.map((project, idx) => (
                                <SwiperSlide className="swiper-slide" key={idx}>
                                    <ProjectCard key={idx} project={project}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                }

                {window.localStorage.getItem('Display') === 'Profile' && 
                    <>
                        <div className="gallery-heading">
                            <h1 className="gallery-title">{name}</h1>
                            {profileProjects.length === 0 ? (
                                <p className="gallery-description">No projects yet.</p>

                            ) : (
                                <p className="gallery-description">{profileProjects.length} Projects. &nbsp;&nbsp; {totalTechnologies} Technologies. &nbsp;&nbsp; {totalLikes} Likes.</p>
                            )}
                        </div>
                        <Swiper
                            direction={"horizontal"}
                            slidesPerView={1}
                            spaceBetween={30}
                            grabCursor={true}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true
                            }}
                            modules={[Pagination]}
                        >
                            {profileProjectsArr !== [] && profileProjectsArr.map((project, idx) => (
                                <SwiperSlide className="swiper-slide" key={idx}>
                                    <ProjectCard key={idx} project={project}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                }

                {window.localStorage.getItem('Display') === 'Favorites' && 
                    <>
                        <div className="gallery-heading">
                            <h1 className="gallery-title">FAVORITES</h1>
                            <p className="gallery-description">Your inspiration collection.</p>
                        </div>
                        <Swiper
                            direction={"horizontal"}
                            slidesPerView={1}
                            spaceBetween={30}
                            grabCursor={true}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true
                            }}
                            modules={[Pagination]}
                        >
                            {favoritesProjectsArr !== [] && favoritesProjectsArr.map((project, idx) => (
                                <SwiperSlide className="swiper-slide" key={idx}>
                                    <ProjectCard key={idx} project={project}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                }
            </div>
        </div>
    );
};

export default Gallery;