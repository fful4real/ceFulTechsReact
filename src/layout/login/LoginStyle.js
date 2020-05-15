import styled from 'styled-components'


export const LoginStyle = styled.div`
    @keyframes rotating  {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    }
    .rotate {
    display:inline-block;
    animation: rotating 2s linear infinite;
    }
`