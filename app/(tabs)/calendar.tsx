import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { CalendarView } from '../../components/CalendarView';
import { ThemedView } from '../../components/ThemedView';
import { COLORS } from '../../constants/Colors';
import { useTasks } from '../../state/TaskContext';

export default function CalendarScreen() {
  const { tasks } = useTasks();
  return (
    <SafeAreaView style={styles.safe}>
      <ThemedView style={styles.container}>
        <CalendarView tasks={tasks} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, padding: 8 },
  appBar: {
    height: 56,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
