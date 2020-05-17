import styled from 'styled-components'


export const CustomerProfileStyle = styled.div`
    .profile-cover-content{
        &.media{
            .media-img-wrap{
                margin-right: 15px;
            }

            .modify-customer-profile{
                top:20%;
                right: 0;
            }
        }
        .email{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 220px;
        }
    }
    .customer-avatar.avatar{
        width: 110px;
        height: 110px;
    }

    @media (max-width: 991px){
        .d-flex.justify-content-left{
            justify-content:center !important;
        }
        .profile-cover-content{
            &.media{
                flex-direction: column;
                margin-bottom: 20px;
                text-align: center;

                .media-img-wrap {
                    margin-right: 0;
                    margin-bottom: 15px;
                }

                .modify-customer-profile{
                    top:0;
                    right: 0;
                }
            }
        }
    }
`