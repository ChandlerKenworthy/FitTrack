import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmptySettings } from "../state/EmptyState";

export const SettingsContext = createContext({
    darkMode: false,
    metricUnits: true,
    guiScale: 1.0,
    toggleDarkMode: (darkMode) => {},
    toggleUnitSystem: (useMetricUnits) => {},
    updateGUIScale: (guiscale) => {},
});

export function SettingsContextProvider({children}) {
    const [settings, setSettings] = useState({});

    async function toggleDarkMode(darkMode) {
        const newSettings = {
            ...settings,
            darkMode: darkMode
        }
        try {
            const result = await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
        } catch (e) {
            console.log(e);
        }
        setSettings(newSettings);
    }

    async function toggleUnitSystem(useMetricUnits) {
        const newSettings = {
            ...settings,
            useMetricUnits: useMetricUnits
        }
        try {
            const result = await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
        } catch (e) {
            console.log(e);
        }
        setSettings(newSettings);
    }
    
    async function updateGUIScale(guiscale) {
        const newSettings = {
            ...settings,
            guiScale: guiscale
        }
        try {
            const result = await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
        } catch (e) {
            console.log(e);
        }
        setSettings(newSettings);
    }

    const value = {
        darkMode: settings.darkMode,
        metricUnits: settings.useMetricUnits,
        guiScale: settings.guiScale,
        toggleDarkMode: toggleDarkMode,
        toggleUnitSystem: toggleUnitSystem,
        updateGUIScale: updateGUIScale,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};