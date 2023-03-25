import { createContext, useState } from "react";

export const SettingsContext = createContext({
    darkMode: false,
    metricUnits: true,
    guiScale: 1.0,
    toggleDarkMode: (darkMode) => {},
    toggleUnitSystem: (useMetricUnits) => {},
    updateGUIScale: (guiscale) => {},
});

export default function SettingsContextProvider({children}) {
    const [darkMode, setDarkMode] = useState(false);
    const [metricUnits, setMetricUnits] = useState(true);
    const [guiScale, setGUIScale] = useState(1.0);

    function toggleDarkMode(darkMode) {
        setDarkMode(darkMode); // Update state
        // Write to JSON file as well
    }

    function toggleUnitSystem(useMetricUnits) {
        setMetricUnits(useMetricUnits);
    }
    
    function updateGUIScale(guiscale) {
        setGUIScale(guiscale);
    }

    const value = {
        darkMode: darkMode,
        metricUnits: metricUnits,
        guiScale: guiScale,
        toggleDarkMode: toggleDarkMode,
        toggleUnitSystem: toggleUnitSystem,
        updateGUIScale: updateGUIScale,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};