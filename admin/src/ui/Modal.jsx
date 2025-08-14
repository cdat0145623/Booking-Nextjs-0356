import PropTypes from "prop-types";
import { HiXMark } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
    ${(props) =>
        props.type === "large" &&
        css`
            overflow: scroll;
            height: 100vh;
        `}
`;

StyledModal.defaultProps = {
    type: "original",
};

// const StyledModal = styled.div`
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: var(--color-grey-0);
//     border-radius: var(--border-radius-lg);
//     box-shadow: var(--shadow-lg);
//     padding: 3.2rem 4rem;
//     transition: all 0.5s;
//     overflow: scroll;
// `;

// eslint-disable-next-line no-unused-vars
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

// eslint-disable-next-line no-unused-vars
const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

const ModalContext = createContext();

function Modal({ children }) {
    const [openName, setOpenName] = useState("");

    const close = () => setOpenName("");
    const open = setOpenName;

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
}

function Open({ children, opens: openWindowName }) {
    const { open } = useContext(ModalContext);

    return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({ children, name }) {
    const { openName, close } = useContext(ModalContext);
    const ref = useOutsideClick(close);

    if (name !== openName) return null;

    return createPortal(
        <Overlay>
            <StyledModal
                ref={ref}
                type={name === "table" ? "large" : "original"}
            >
                <Button onClick={close}>
                    <HiXMark />
                </Button>
                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;

Modal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Window.propTypes = {
    children: PropTypes.object,
    name: PropTypes.string,
};

export default Modal;
