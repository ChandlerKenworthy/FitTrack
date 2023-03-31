import React, { useContext } from 'react'
import { SettingsContext } from '../../store/settings-context'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { userAuthContext } from '../../store/UserAuthContext';
import { colors } from '../../constants/Globalstyles';
import { StatusBar } from 'expo-status-bar';

const CustomNavigationContainer = ({authStack, authenticatedStack}) => {
    const settingsCtx = useContext(SettingsContext);
    const userCtx = useContext(userAuthContext);

    const customTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: settingsCtx.darkMode ? colors.lightblack : '#f1f1f1',
            card: settingsCtx.darkMode ? colors.extralightblack : colors.white,
            border: settingsCtx.darkMode ? colors.extralightblack : colors.lightgray,
        }
    };

    return (
        <NavigationContainer theme={customTheme}>
            <StatusBar style={settingsCtx.darkMode ? "light" : "dark"} />
            {userCtx.user ? authenticatedStack() : authStack()}
        </NavigationContainer>
    )
}

export default CustomNavigationContainer