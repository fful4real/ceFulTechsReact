import styled from 'styled-components'


export const CustomerProfileStyle = styled.div`
    @media (max-width: 991px){
        .profile-cover-content{
            &.media{
                flex-direction: column;
                margin-bottom: 20px;
                text-align: center;

                .media-img-wrap {
                    margin-right: 0;
                    margin-bottom: 15px;
                }
            }
        }
    }
    .profile-cover-content{
        &.media{
            .media-img-wrap{
                margin-right: 15px;
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
`