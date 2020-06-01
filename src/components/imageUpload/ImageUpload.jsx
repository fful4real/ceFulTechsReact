import React from 'react'
import { ImageUploadStyle } from './ImageUploadStyle'
import Axios from 'axios'
import { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { updateImagesAsync } from '../../redux/Images/ImagesActions'
import { connect } from 'react-redux'
import { selectImages } from '../../redux/Images/ImagesSelectors'

const ImageUpload = ({name="imageUploade", handleChange, updateImages, images}) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleImageChangeChange = (e)=>{
        setIsSubmitting(true)
        let formData = new FormData()
        const file = e.target.files[0]
        handleChange(isSubmitting)
        formData.append('file', file)
        Axios.post('/images', formData, config)
          .then(function (response) {
            images = [response.data, ...images]
            updateImages(images)
            setIsSubmitting(false)
            console.log(response);
          })
          .catch(function (error) {
            setIsSubmitting(false)
            console.log(error);
          });
    }
    return (
            <ImageUploadStyle>
                <input 
                    type="file" 
                    name={name}
                    id=""
                    className="form-control-file text-primary font-weight-bold"
                    data-title={`${isSubmitting?"Uploading...":"Add a new Image"}`}
                    onChange={handleImageChangeChange}
                    disabled={isSubmitting}
                    style={{cursor:isSubmitting?'progress !important':'pointer'}}
                />
            </ImageUploadStyle>
    )
}

const mapStateToProps = createStructuredSelector({
    images: selectImages
})

const mapDispatchToProps = {
    updateImages: updateImagesAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload)
