import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TASK_CATEGORIES } from '../constants/categories';
import { Task } from '../types/task';
import { COLORS } from '../constants/Colors';
interface Props {
  task: Task;
  onEdit: () => void;
  onDone: () => void;
}



export const TaskCard: React.FC<Props> = ({ task, onEdit, onDone }) => {
  const category = TASK_CATEGORIES.find(c => c.key === task.category);
  const headTextColor = useThemeColor({}, 'headText');
  const subheadTextColor = useThemeColor({}, 'subText');
  const accentColor = useThemeColor({}, 'accent');
  const cardColor = useThemeColor({}, 'card');

  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: category?.color || COLORS.custom }]} />
        <Text style={[styles.title, { color: headTextColor }]}>{task.title}</Text>
      </View>
      <Text style={[styles.dueDate, { color: subheadTextColor }]}>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} accessibilityLabel="Edit task">
          <MaterialCommunityIcons name="pencil" size={20} color={accentColor} />
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
    borderRadius: 18,
    padding: 16,
    marginVertical: 10,
    elevation: 1,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  title: { fontSize: 16, fontWeight: '600', flex: 1 },
  dueDate: { marginTop: 4, fontSize: 13 },
  actions: { flexDirection: 'row', gap: 16, marginTop: 8 },
});

// TODO: Add accessibility improvements, swipe actions, and snooze button
