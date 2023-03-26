import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/Globalstyles'
import { SettingsContext } from '../store/settings-context';

const SettingsScreen = () => {
  const settingsCtx = useContext(SettingsContext);

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.settingGroupContainer}>
          <View style={styles.groupIcon}>
            <MaterialIcons name="visibility" size={30} color="black" />
            <Text style={styles.settingsGroupText}>Visibility</Text>
          </View>
          <View style={[styles.settingContainer, styles.firstSettingContainer]}>
            <Text style={styles.settingNameText}>Dark Mode</Text>
            <Button 
              title={settingsCtx.darkMode ? "On" : "Off"}  
              onPress={() => settingsCtx.toggleDarkMode(!settingsCtx.darkMode)}  
            />
          </View>
          <View style={styles.settingContainer}>
            <Text style={styles.settingNameText}>GUI Scale</Text>
            <Button 
              title={`${settingsCtx.guiScale}`}  
              onPress={() => settingsCtx.updateGUIScale(2.0)}  
            />
          </View>
          <View style={[styles.settingContainer, styles.lastSettingContainer]}>
            <Text style={styles.settingNameText}>Units</Text>
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
    marginBottom: 8,
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
    color: colors.charcoal
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