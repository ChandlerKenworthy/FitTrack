import React, { useContext } from 'react'
import { SettingsContext } from '../../store/settings-context'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { userAuthContext } from '../../store/UserAuthContext';
import { colors } from '../../constants/Globalstyles';

const CustomNavigationContainer = ({authStack, authenticatedStack}) => {
    const settingsCtx = useContext(SettingsContext);
    const userCtx = useContext(userAuthContext);

    const customTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: settingsCtx.darkMode ? '#1b1b1d' : '#f1f1f1',
            card: settingsCtx.darkMode ? '#242526' : colors.white,
        }
    };

    return (
        <NavigationContainer theme={customTheme}>
            {userCtx.user ? authenticatedStack() : authStack()}
        </NavigationContainer>
    )
}

export default CustomNavigationContainer