import React from 'react';

interface InternalVideoProps {
    videoSrc: string;
    overlayOpacity?: string;
    height?: string;
}

const InternalVideo = ({
    videoSrc,
    overlayOpacity = "bg-black/30",
    height = "h-[400px] md:h-[500px]"
}: InternalVideoProps) => {
    return (
        <div className={`relative w-full ${height} overflow-hidden rounded-2xl my-8 shadow-2xl`}>
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={`absolute inset-0 ${overlayOpacity}`} />
        </div>
    );
};

export default InternalVideo;
