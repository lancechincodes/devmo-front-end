import './Gallery.css'
import { useState } from 'react'
import TopNav from '../TopNav/TopNav';
import ProjectCard from '../ProjectCard/ProjectCard';

const sampleCard = {
    
}

function Gallery() {

    return (
        <div className="gallery-page">
            <TopNav/>
            <div className="gallery-heading">
                <h1 className="gallery-title">FEATURED</h1>
                <p className="gallery-description">Our editors' top picks.</p>
            </div>
            <ProjectCard/>
        </div>
    );
};

export default Gallery;