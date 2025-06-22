import { useThemeColor } from '@/hooks/useThemeColor';
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

// Shared style constants for cards/modals
export const CARD_RADIUS = 16;
export const CARD_SHADOW = {
  shadowColor: COLORS.shadow,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.10,
  shadowRadius: 8,
  elevation: 4,
};

export const TaskCard: React.FC<Props> = ({ task, onEdit, onDone }) => {
  const category = TASK_CATEGORIES.find(c => c.key === task.category);
  const textColor = useThemeColor({}, 'text');
  const accentColor = useThemeColor({}, 'tint');
  return (
    <View style={[styles.card, CARD_SHADOW]}> 
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: category?.color || COLORS.custom }]} />
        <Text style={[styles.title, { color: textColor }]}>{task.title}</Text>
      </View>
      <Text style={[styles.dueDate, { color: accentColor }]}>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
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
    borderRadius: CARD_RADIUS,
    padding: 20,
    marginVertical: 10,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  title: { fontSize: 16, fontWeight: '600', flex: 1 },
  dueDate: { marginTop: 4, fontSize: 13 },
  actions: { flexDirection: 'row', gap: 16, marginTop: 8 },
});

// TODO: Add accessibility improvements, swipe actions, and snooze button
