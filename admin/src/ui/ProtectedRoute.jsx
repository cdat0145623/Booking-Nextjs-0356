import styled from "styled-components";
import PropTypes from "prop-types";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-gray-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;
function ProtectedRoute({ children }) {
    const { isLoading, isAuthenticated } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) return navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    if (isAuthenticated) return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
export default ProtectedRoute;
