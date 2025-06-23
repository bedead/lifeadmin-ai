import React from 'react';
import { Alert, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { cancelAllTaskNotifications, requestNotificationPermissions } from '../../components/NotificationManager';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useThemeColor } from '../../hooks/useThemeColor';
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

  // Theme-aware colors
  const accent = useThemeColor({}, 'accent'); // Accent color for switches and buttons
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const border = useThemeColor({}, 'border');

  return (
    <ThemedView style={[styles.container, { backgroundColor: background }]}> {/* already themed, but explicit */}
      <View style={[styles.row, { borderColor: border }]}> {/* Add border for separation if desired */}
        <ThemedText type='default' style={[styles.label, { color: text }]}>Task Notifications</ThemedText>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleToggleNotifications}
          thumbColor={notificationsEnabled ? accent : background}
          trackColor={{ true: accent, false: border }}
        />
      </View>
      <View style={[styles.row, { borderColor: border }]}> {/* Add border for separation if desired */}
        <ThemedText type='default' style={[styles.label, { color: text }]}>Use System Theme</ThemedText>
        <Switch
          value={useSystemTheme}
          onValueChange={handleToggleSystemTheme}
          thumbColor={useSystemTheme ? accent : background}
          trackColor={{ true: accent, false: border }}
        />
      </View>
      <View style={[styles.row, { borderColor: border }]}> {/* Add border for separation if desired */}
        <ThemedText type='default' style={[styles.label, { color: text }]}>Dark Mode</ThemedText>
        <Switch
          value={darkMode}
          onValueChange={handleToggleDarkMode}
          thumbColor={darkMode ? accent : background}
          trackColor={{ true: accent, false: border }}
          disabled={useSystemTheme}
          style={useSystemTheme ? { opacity: 0.5 } : undefined}
        />
      </View>
      <View style={styles.rowButtons}>
        <ThemedText type='default' style={[styles.label, { color: text }]}>Export/Import Tasks</ThemedText>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={[styles.button, { backgroundColor: accent }]} onPress={handleExport} accessibilityLabel="Export tasks">
            <ThemedText type='default' style={styles.buttonText}>Export</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: accent }]} onPress={handleImport} accessibilityLabel="Import tasks">
            <ThemedText type='default' style={styles.buttonText}>Import</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <ThemedText type='default' style={[styles.label, { color: text }]}>Biometric Lock</ThemedText>
        <TouchableOpacity style={[styles.button, { backgroundColor: accent }]} onPress={handleBiometricLock} accessibilityLabel="Enable biometric lock">
          <ThemedText type='default' style={styles.buttonText}>Enable</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  rowButtons: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  label: { fontSize: 16 },
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 4,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
