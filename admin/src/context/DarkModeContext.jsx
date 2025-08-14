import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    // const [isDarkMode, setDarkMode] = useLocalStorageState(
    //     window.matchMedia("(prefer-color-scheme: dark)").matches,
    //     "isDarkMode"
    // );
    const [isDarkMode, setDarkMode] = useLocalStorageState(
        "isDarkMode",
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(
        function () {
            if (isDarkMode) {
                document.documentElement.classList.add("dark-mode");
                document.documentElement.classList.remove("light-mode");
            } else {
                document.documentElement.classList.add("light-mode");
                document.documentElement.classList.remove("dark-mode");
            }
        },
        [isDarkMode]
    );

    function toggleDarkMode() {
        setDarkMode((isDarkMode) => !isDarkMode);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

DarkModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { DarkModeProvider, DarkModeContext };

// function useDarkMode() {
//     const context = useContext(DarkModeContext);
//     if (context === undefined)
//         throw new Error("DarkModeContext was used outside of PostProvider");
//     return context;
// }

// DarkModeProvider.propTypes = {
//     children: PropTypes.object,
// };

// export { useDarkMode, DarkModeProvider };
