import React from 'react'
import UserProfileContentOrderDetails from './UserProfileContentOrderDetails'
import UserProfileContentOrders from './UserProfileContentOrders'

const UserProfileContent = () => {
    return (
        <div className="tab-contentmt-sm-60 mt-30">
            <div className="tab-pane fade show active" role="tabpanel">
                <div className="container">
                    <div className="hk-row">
                        <UserProfileContentOrders />
                        <UserProfileContentOrderDetails />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileContent
