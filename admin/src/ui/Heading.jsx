import styled, { css } from "styled-components";

// const Heading = styled.h1`
//     color: black;
//     /* background-color: var(--color-brand-700); */
//     height: max-content;
//     font-size: medium;
//     margin-top: 20px;

//     ${(props) =>
//         props.as === "h1" &&
//         css`
//             font-size: 4rem;
//         `}

//     ${(props) =>
//         props.as === "h2" &&
//         css`
//             font-size: 3rem;
//         `}

//         ${(props) =>
//         props.as === "h3" &&
//         css`
//             font-size: 2rem;
//         `}
//         ${(props) =>
//         props.as === "h4" &&
//         css`
//             font-size: 3rem;
//             font-weight: 600;
//             text-align: center;
//         `}
// `;
const Heading = styled.h1`
    ${(props) =>
        props.as === "h1" &&
        css`
            font-size: 3rem;
            font-weight: 600;
        `}

    ${(props) =>
        props.as === "h2" &&
        css`
            font-size: 2rem;
            font-weight: 600;
        `}
    
    ${(props) =>
        props.as === "h3" &&
        css`
            font-size: 2rem;
            font-weight: 500;
        `}
    
    ${(props) =>
        props.as === "h4" &&
        css`
            font-size: 3rem;
            font-weight: 600;
            text-align: center;
        `}
    
  line-height: 1.4;
`;

export default Heading;
