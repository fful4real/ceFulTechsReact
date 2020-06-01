import styled from 'styled-components'


export const ImageUploadStyle = styled.div`
    .form-control-file{
        width:100%;
        height:100%;
        visibility:hidden;
        cursor:pointer;
        position: relative;
        min-height:6rem;
        &:before {
            content: attr(data-title);
            position:absolute;
            visibility:visible;
            width:100%;
            border: 2px dashed lightgray;
            border-radius:1rem;
            text-align:center;
            overflow:hidden;
            color: #6c757d;
            font-size: 1em;
            min-height:6rem;
            line-height:2em;
            padding-top:2em;
        }
    }
`