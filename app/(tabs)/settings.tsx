import React from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import { cancelAllTaskNotifications, requestNotificationPermissions } from '../../components/NotificationManager';
import { COLORS } from '../../constants/Colors';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

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
      {/* TODO: Add dark mode toggle, export/import, and biometric lock */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24 },
  header: { fontSize: 22, fontWeight: '700', color: COLORS.text, marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  label: { fontSize: 16, color: COLORS.text },
});
