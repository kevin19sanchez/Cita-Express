import React from 'react'
import IconCircle from './IconCircle'

export default function FeatureCard({icon, title, children}) {
    return (
        <div className='col-12 col-md-4 mb-4'>
            <div className='card border-0 shadow-sm h-100 text-center'>
                <div className="card-body">
                    <IconCircle icon={icon} size={70}/>
                    <h5 className='mt-3 mb-2'>{title}</h5>
                    <p className='text-muted mb-0'>{children}</p>
                </div>
            </div>
        </div>
    )
}
