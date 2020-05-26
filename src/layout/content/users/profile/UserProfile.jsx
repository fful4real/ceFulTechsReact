import React from 'react'
import UserProfileHeader from './UserProfileHeader'
import UserProfileContent from './UserProfileContent'

const UserProfile = () => {
    
    return (
        <React.Fragment>
            <div className="col-xl-12 pa-0">
                <UserProfileHeader />
                <UserProfileContent />
            </div>
        </React.Fragment>
    )
}

export default UserProfile
