import React from "react";

interface IImage {
    src: string;
    alt: string;
    className: string;
    onClick?: () => void
}

const Image = ({ src, alt, className, onClick }: IImage) => {
    return (
        <img
            onClick={onClick}
            src={src}
            alt={alt}
            className={className}
        />
    );
};

Image.defaultProps = {
    src: "#",
    alt: "image",
    className: ""
};

export default Image;
