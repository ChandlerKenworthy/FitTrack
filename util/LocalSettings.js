import AsyncStorage from "@react-native-async-storage/async-storage";
import { EmptySettings } from "../state/EmptyState";

export async function getSettingsFromStorage() {
    try {
        let prefs = await AsyncStorage.getItem('settings');
        prefs = prefs != null ? JSON.parse(prefs) : EmptySettings;
        return prefs;
    }
    catch(e) {
        console.log(e);
        return EmptySettings;
    }
  }