import React from 'react';

const PageBackgroundVideo = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-20">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/assets/internal-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
        </div>
    );
};

export default PageBackgroundVideo;
