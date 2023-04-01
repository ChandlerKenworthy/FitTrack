import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/Globalstyles'
import { SettingsContext } from '../store/settings-context';

const SettingsScreen = () => {
  const settingsCtx = useContext(SettingsContext);

  const darkModeSettingContainer = {
    backgroundColor: colors.extralightblack,
    borderBottomColor: colors.gray,
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.settingGroupContainer}>
          <View style={styles.groupIcon}>
            <MaterialIcons name="visibility" size={30} color={settingsCtx.darkMode ? colors.white : colors.charcoal} />
            <Text style={[styles.settingsGroupText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>Visibility</Text>
          </View>
          <View style={[styles.settingContainer, styles.firstSettingContainer, settingsCtx.darkMode && darkModeSettingContainer]}>
            <Text style={[styles.settingNameText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>Dark Mode</Text>
            <Button 
              title={settingsCtx.darkMode ? "On" : "Off"}  
              onPress={() => settingsCtx.toggleDarkMode(!settingsCtx.darkMode)}  
            />
          </View>
          <View style={[styles.settingContainer, settingsCtx.darkMode && darkModeSettingContainer]}>
            <Text style={[styles.settingNameText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>GUI Scale</Text>
            <Button 
              title={`${settingsCtx.guiScale}`}  
              onPress={() => settingsCtx.updateGUIScale(2.0)}  
            />
          </View>
          <View style={[styles.settingContainer, styles.lastSettingContainer, settingsCtx.darkMode && darkModeSettingContainer]}>
            <Text style={[styles.settingNameText, {color: settingsCtx.darkMode ? colors.white : colors.charcoal}]}>Units</Text>
            <Button 
              title={settingsCtx.metricUnits ? "Metric" : "Imperial"}  
              onPress={() => settingsCtx.toggleUnitSystem(!settingsCtx.metricUnits)}  
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  root: {
    marginTop: 15
  },

  settingGroupContainer: {
    marginHorizontal: 15,
  },

  settingsGroupText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '700'
  },

  groupIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.extralightgray,
    borderBottomColor: colors.lightgray,
    borderBottomWidth: 1,
  },

  settingNameText: {
    fontSize: 18,
  },

  firstSettingContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  lastSettingContainer: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
})