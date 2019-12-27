import React from 'react'
import {Link} from 'react-router-dom'
import LogoFacebook from 'react-ionicons/lib/LogoFacebook'
import LogoTwitter from 'react-ionicons/lib/LogoTwitter'
import LogoGoogleplus from 'react-ionicons/lib/LogoGoogleplus'

const FooterContent = ()=>{

    return (
        <div className="hk-footer-wrap container">
                <footer className="footer">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <p>Pampered by<Link to="" className="text-dark" >FulTechs</Link> © 2019</p>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <p className="d-inline-block">Follow us</p>
                            <Link to="/" className="d-inline-block btn btn-icon btn-icon-only btn-indigo btn-icon-style-4">
                                <span className="btn-icon-wrap"   title="FulTechs Facebook"><LogoFacebook className="fa fa-facebook"/></span>
                            </Link>
                            <Link to="/" className="d-inline-block btn btn-icon btn-icon-only btn-indigo btn-icon-style-4">
                                <span className="btn-icon-wrap"  title="FulTechs Twitter"><LogoTwitter className="fa fa-twitter" /></span>
                            </Link>
                            <Link to="/" className="d-inline-block btn btn-icon btn-icon-only btn-indigo btn-icon-style-4">
                                <span className="btn-icon-wrap"><LogoGoogleplus className="fa fa-google-plus"/></span>
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
    )
}

export default FooterContent;