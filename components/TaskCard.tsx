import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TASK_CATEGORIES } from '../constants/categories';
import { COLORS } from '../constants/Colors';
import { Task } from '../types/task';

interface Props {
  task: Task;
  onEdit: () => void;
  onDone: () => void;
}

export const TaskCard: React.FC<Props> = ({ task, onEdit, onDone }) => {
  const category = TASK_CATEGORIES.find(c => c.key === task.category);
  return (
    <View style={[styles.card, { shadowColor: COLORS.shadow }]}> 
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: category?.color || COLORS.custom }]} />
        <Text style={styles.title}>{task.title}</Text>
      </View>
      <Text style={styles.dueDate}>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} accessibilityLabel="Edit task">
          <MaterialCommunityIcons name="pencil" size={20} color={COLORS.accent} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDone} accessibilityLabel="Mark as done">
          <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.health} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  title: { fontSize: 16, color: COLORS.text, fontWeight: '600', flex: 1 },
  dueDate: { color: COLORS.accent, marginTop: 4, fontSize: 13 },
  actions: { flexDirection: 'row', gap: 16, marginTop: 8 },
});

// TODO: Add accessibility improvements, swipe actions, and snooze button
