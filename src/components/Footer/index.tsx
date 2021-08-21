import React from 'react'

export const Footer = () => {
    return (
        <footer className="bg-primaryBg py-8">
            <div className="text-primaryText text-center font-xl font-sans font-semibold">
                Copyright © {new Date().getFullYear()} All Rights Reserved by
                <span className="text-alternateText font-bold">
                    {` Shariq Anwar`}
                </span>
                <span>
                    .
                </span>
            </div>
        </footer>
    )
}
