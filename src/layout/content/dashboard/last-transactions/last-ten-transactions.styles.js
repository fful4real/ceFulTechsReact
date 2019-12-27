import styled from 'styled-components'

const FormContainer = styled.form`
    .input-group-append{
        position: absolute;
        right: 10px;
        top: 0;
        z-index: 4;
        bottom: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        pointer-events: none; 
        .feather-icon{
            display: block;
            color: #848d91 !important;
        }
    }
    .form-control{
        padding-left: 36px;
        border-radius: 50px;
        background: #fff;
    }
`;

export default FormContainer;