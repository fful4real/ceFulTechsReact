import styled from 'styled-components'

const OrderModificationStyle = styled.div`
    .show{
        display:block;
    }
    .hide{
        display:none;
    }
    position: absolute;
    background: rgba(128,128,128,0.6);
    z-index: 2;
    width: 100%;
    height: 100%;
    .card{
        width:90%;
        margin:0 auto;
        margin-top:20px;
        padding-top: 5px;
        padding-bottom: 5px;
        .card-body{
            padding-bottom:5px;
        }
    }
`;

export default OrderModificationStyle;