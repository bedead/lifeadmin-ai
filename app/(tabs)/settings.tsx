import React from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { cancelAllTaskNotifications, requestNotificationPermissions } from '../../components/NotificationManager';
import { COLORS } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useTasks } from '../../state/TaskContext';

export default function SettingsScreen() {
  const { tasks, setTasks } = useTasks();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const colorScheme = useColorScheme();
  const [useSystemTheme, setUseSystemTheme] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(colorScheme === 'dark');

  React.useEffect(() => {
    if (useSystemTheme) {
      setDarkMode(colorScheme === 'dark');
    }
  }, [colorScheme, useSystemTheme]);

  const handleToggleSystemTheme = (value: boolean) => {
    setUseSystemTheme(value);
    if (value) {
      setDarkMode(colorScheme === 'dark');
    }
  };

  const handleToggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    if (value) {
      await requestNotificationPermissions();
      Alert.alert('Notifications enabled', 'You will receive reminders for due tasks.');
    } else {
      await cancelAllTaskNotifications();
      Alert.alert('Notifications disabled', 'You will not receive reminders.');
    }
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    Alert.alert('Theme', `Dark mode is now ${!darkMode ? 'enabled' : 'disabled'}. (App restart may be required)`);
    // TODO: Actually implement theme switching with context/provider
  };

  const handleExport = async () => {
    try {
      const json = JSON.stringify(tasks, null, 2);
      // For demo: copy to clipboard (in real app, use FileSystem or share dialog)
      await navigator.clipboard.writeText(json);
      Alert.alert('Exported', 'Tasks copied to clipboard as JSON.');
    } catch (e) {
      Alert.alert('Export failed', 'Could not export tasks.');
    }
  };

  const handleImport = async () => {
    try {
      // For demo: prompt for JSON (in real app, use file picker)
      const input = prompt('Paste tasks JSON here:');
      if (!input) return;
      const imported = JSON.parse(input);
      if (Array.isArray(imported)) {
        setTasks(imported);
        Alert.alert('Import successful', 'Tasks imported!');
      } else {
        Alert.alert('Import failed', 'Invalid JSON format.');
      }
    } catch (e) {
      Alert.alert('Import failed', 'Could not import tasks.');
    }
  };

  const handleBiometricLock = () => {
    Alert.alert('Biometric Lock', 'Biometric lock coming soon!');
    // TODO: Implement biometric lock logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Task Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleToggleNotifications}
          thumbColor={notificationsEnabled ? COLORS.accent : COLORS.background}
          trackColor={{ true: COLORS.accent, false: COLORS.background }}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Use System Theme</Text>
        <Switch
          value={useSystemTheme}
          onValueChange={handleToggleSystemTheme}
          thumbColor={useSystemTheme ? COLORS.accent : COLORS.background}
          trackColor={{ true: COLORS.accent, false: COLORS.background }}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={handleToggleDarkMode}
          thumbColor={darkMode ? COLORS.accent : COLORS.background}
          trackColor={{ true: COLORS.accent, false: COLORS.background }}
          disabled={useSystemTheme}
        />
      </View>
      <View style={styles.rowButtons}>
        <Text style={styles.label}>Export/Import Tasks</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.button} onPress={handleExport} accessibilityLabel="Export tasks">
            <Text style={styles.buttonText}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleImport} accessibilityLabel="Import tasks">
            <Text style={styles.buttonText}>Import</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Biometric Lock</Text>
        <TouchableOpacity style={styles.button} onPress={handleBiometricLock} accessibilityLabel="Enable biometric lock">
          <Text style={styles.buttonText}>Enable</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24 },
  header: { fontSize: 22, fontWeight: '700', color: COLORS.text, marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  rowButtons: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  label: { fontSize: 16, color: COLORS.text },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 4,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
