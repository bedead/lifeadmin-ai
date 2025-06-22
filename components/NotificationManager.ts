import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Task } from '../types/task';

// Configure notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function requestNotificationPermissions() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
    }
}

export async function scheduleTaskNotification(task: Task) {
    if (!task.dueDate || task.done) return;
    const triggerDate = new Date(task.dueDate);
    if (triggerDate.getTime() < Date.now()) return; // Don't schedule past tasks
    if (Platform.OS === 'web') return; // Notifications not supported on web
    // Use seconds-based trigger for maximum compatibility
    const seconds = Math.max(1, Math.floor((triggerDate.getTime() - Date.now()) / 1000));
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Task Reminder',
            body: `${task.title} is due today!`,
            data: { taskId: task.id },
        },
        trigger: { seconds, channelId: 'default', repeats: false },
    });
}

export async function cancelAllTaskNotifications() {
    // Only call on native platforms
    if (Platform.OS !== 'web') {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }
}

// TODO: Support snooze, recurring notifications, and notification per task
