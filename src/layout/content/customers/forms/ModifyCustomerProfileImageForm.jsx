import React, { useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { uid } from 'react-uid'
import Spinner from '../../../../components/spinner/spinner'
import { useState } from 'react'
import { selectImages } from '../../../../redux/Images/ImagesSelectors'
import { showModalAlertAttempt } from '../../../../redux/fultechs/FulTechsActions'
import { setCustomerModalHeadingAttempt, updateCustomerAttempt } from '../../../../redux/customers/customers.action'
import API_ROUTES, { ImageUrl } from '../../../../api-route'
import ImageUpload from '../../../../components/imageUpload/ImageUpload'
import { selectCurrentCustomer, selectCustomers } from '../../../../redux/customers/customers.selectors'
import { Formik } from 'formik'
import AxiosAgent from '../../../../axios-agent'

const ModifyCustomerProfileImageForm = ({images, updateCustomer, modalHeading, setModalHeading, closeModal,customers, currentCustomer, showModalAlert})=> {
    useEffect(() => {
        setModalHeading("Modify Profile Image")
    }, [setModalHeading,modalHeading])
    const customer = customers.filter(mapCustomer=>mapCustomer.id===currentCustomer)[0]
    const [activeImage, setActiveImage] = useState('')
    let initialVals = {
        profileImage:customer.profileImage?customer.profileImage.id:'',
    }

    return (
        <>
        <div className="row">
            {
                images.map(image=>(
                    <div key={`status-${uid(image.id)}`} 
                        className="col-md-4 col-sm-6 col-lg-2 "
                        onClick={()=>setActiveImage(image.id)} 
                        style={{height:"100px", overflow:"hidden"}}
                    >
                        <div className={`feed-img shadow-hover cursor-pointer h-100 border mb-10 border-2 rounded-10 border-${activeImage===image.id?'primary':''}`} style={{overflow:"hidden"}}>
                            <img src={ImageUrl+image.url} alt="Img" className="img-fluid"/>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className="row">
            <div className="col-12 mt-md-5 mt-s-0 mt-lg-10">
                <Formik initialValues={initialVals}
                    onSubmit = {
                        (values, {setSubmitting})=>{
                            if (!activeImage) {
                                alert('U didn\'t select an image')
                                return false
                            }
                            const processValues = {
                                profileImage: `/api/images/${activeImage}`
                            }
                            console.log(activeImage, JSON.stringify(processValues,null,2))
                            AxiosAgent.request('patch', API_ROUTES.customers(customer.id), null, processValues)
                                    .then(resp =>{
                                            console.log(resp)
                                            updateCustomer(resp.data)
                                            showModalAlert('success', 'check-circle', 'Profile image updated')
                                            setSubmitting(false)
                                        }
                                    )
                                    .catch(err => {
                                        console.log(err)
                                        showModalAlert('danger', 'block', 'There was an error updating profile image')
                                        setSubmitting(false)
                                    }
                            );
                        }
                    }
                >
                {({handleSubmit,isSubmitting, setSubmitting})=>{
                    return(
                        <Form onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <ImageUpload name="customerProfileImage" handleChange={(submitting)=>setSubmitting(submitting)} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="6" className="mb-md-0 mb-lg-0 mb-s-5" controlId="validationSubmitForm">
                                    <Button className="btn-block" disabled={isSubmitting} variant="danger" size="lg" type="submit">
                                        {
                                            isSubmitting? <Spinner spinnerHeight="24px" spinnerFontSize="1.2em" spinnerRight="48%"/>: "Update"
                                        }
                                    </Button>
                                </Form.Group>
                                <Form.Group as={Col} md="6" className="mb-md-0 mb-lg-0 mb-s-5" controlId="validationCancel">
                                    <Button className="btn-block" onClick={closeModal} disabled={isSubmitting} variant="secondary" size="lg" type="button">
                                        Close
                                    </Button>
                                </Form.Group>
                            </Form.Row>
                        </Form>
            
                    )
                }}
                </Formik>
            </div>
        </div>
        </>
    )
}
const mapStateToProps = createStructuredSelector({
    images: selectImages,
    currentCustomer: selectCurrentCustomer,
    customers: selectCustomers,
})

const mapDispatchToProps = {
    showModalAlert: showModalAlertAttempt,
    setModalHeading: setCustomerModalHeadingAttempt,
    updateCustomer: updateCustomerAttempt
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyCustomerProfileImageForm)
