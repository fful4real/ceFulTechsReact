import styled from 'styled-components'

const CustomerItemStyle = styled.tr`
    cursor:pointer;
    td{
        position: relative !important;
        .avatar{
            position: absolute;
        }
        span.text-value{
            display: inline-block;
            margin-left: 3em;
            padding: 0.3em 0;
        }
    }
`;

export default CustomerItemStyle;