import './Gallery.css'
import { useState, useContext } from 'react'
import { DataContext } from '../../DataContext'
import TopNav from '../TopNav/TopNav';
import ProjectCard from '../ProjectCard/ProjectCard';

function Gallery() {
    const { isActive } = useContext(DataContext)

    return (
        <div className="gallery-page">
            <TopNav/>
            <div className={isActive ? "gallery-main blur" : "gallery-main"}>
                <div className="gallery-heading">
                    <h1 className="gallery-title">FEATURED</h1>
                    <p className="gallery-description">Our editors' top picks.</p>
                </div>
                <ProjectCard/>
            </div>
        </div>
    );
};

export default Gallery;