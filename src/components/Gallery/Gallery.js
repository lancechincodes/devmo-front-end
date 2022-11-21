import './Gallery.css'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../DataContext'
import TopNav from '../TopNav/TopNav';
import ProjectCard from '../ProjectCard/ProjectCard';
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper";
import TwitterLikeButton from 'twitter-like-button'

function Gallery() {
    const { isActive } = useContext(DataContext)
    const [name, setName] = useState('')
    const [profileProjects, setProfileProjects] = useState([])
    const [totalTechnologies, setTotalTechnologies] = useState()
    const [featuredProjectsArr, setFeaturedProjectsArr] = useState([])
    const [discoverProjectsArr, setDiscoverProjectsArr] = useState([])
    const [profileProjectsArr, setProfileProjectsArr] = useState([])

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

    useEffect(() => {
        axios.get('http://localhost:8000/api/projects')
            .then(res => {
                console.log(res.data)
                const allProjects = res.data
                setDiscoverProjectsArr(allProjects.reverse())

                const profileProjects = allProjects.filter(project => project.owner.email === window.localStorage.getItem('Email'))
                setProfileProjectsArr(profileProjects)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="gallery-page">
            <TopNav/>
            <div className="gallery-main">
                {window.localStorage.getItem('Display') === 'Featured' && 
                    <div className="gallery-heading">
                        <h1 className="gallery-title">FEATURED</h1>
                        <p className="gallery-description">Our top-rated picks.</p>
                    </div>
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
                            mousewheel={true}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true
                            }}
                            modules={[Mousewheel, Pagination]}
                            className="mySwiper"
                        >
                            {discoverProjectsArr.map((project, idx) => (
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
                            <p className="gallery-description">{profileProjects.length} Projects. {totalTechnologies} Technologies. # Likes.</p>
                        </div>
                        <Swiper
                            direction={"horizontal"}
                            slidesPerView={1}
                            spaceBetween={30}
                            mousewheel={true}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true
                            }}
                            modules={[Mousewheel, Pagination]}
                        >
                            {profileProjectsArr.map((project, idx) => (
                                <SwiperSlide className="swiper-slide" key={idx}>
                                    <ProjectCard key={idx} project={project}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                }
                <div></div>
            </div>
        </div>
    );
};

export default Gallery;