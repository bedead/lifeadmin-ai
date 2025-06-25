import { useThemeColor } from '@/hooks/useThemeColor';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';
import { TASK_CATEGORIES } from '../constants/categories';
import { RECURRENCE_OPTIONS } from '../constants/recurrence';
import { Task } from '../types/task';
import { CARD_RADIUS, CARD_SHADOW } from './TaskCard';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

export const TaskForm: React.FC<Props> = ({ visible, onClose, onSubmit, initialTask }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [category, setCategory] = useState(initialTask?.category || TASK_CATEGORIES[0].key);
  const [dueDate, setDueDate] = useState<Date>(initialTask ? new Date(initialTask.dueDate) : new Date());
  const [recurrence, setRecurrence] = useState(initialTask?.recurrence || 'none');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const COLORS = {
    background: useThemeColor({}, 'background'),
    card: useThemeColor({}, 'card'),
    accent: useThemeColor({}, 'accent'),
    text: useThemeColor({}, 'text')
  };

  const styles = getStyles(COLORS, CARD_RADIUS);


  const handleSave = () => {
    const task: Task = {
      id: initialTask?.id || (uuid.v4() as string),
      title,
      category,
      dueDate: dueDate.toISOString(),
      recurrence: recurrence as 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly',
      done: initialTask?.done || false,
      snoozed: initialTask?.snoozed || false,
      createdAt: initialTask?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(task);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.container, CARD_SHADOW]}>
          <Text style={[styles.header, { color: COLORS.text }]}>{initialTask ? 'Edit Task' : 'Add Task'}</Text>
          <TextInput
            style={[styles.input, { color: COLORS.text }]}
            placeholder="Task title"
            value={title}
            onChangeText={setTitle}
            accessibilityLabel="Task title"
            placeholderTextColor={COLORS.text}
          />
          <Picker
            selectedValue={category}
            onValueChange={setCategory}
            style={styles.picker}
            accessibilityLabel="Category"
          >
            {TASK_CATEGORIES.map(cat => (
              <Picker.Item key={cat.key} label={cat.label} value={cat.key} />
            ))}
          </Picker>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton} accessibilityLabel="Pick due date">
            <Text style={[styles.dateText, { color: COLORS.text }]}>Due: {dueDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, date) => {
                setShowDatePicker(false);
                if (date) setDueDate(date);
              }}
            />
          )}
          <Picker
            selectedValue={recurrence}
            onValueChange={setRecurrence}
            style={styles.picker}
            accessibilityLabel="Recurrence"
          >
            {RECURRENCE_OPTIONS.map(opt => (
              <Picker.Item key={opt.key} label={opt.label} value={opt.key} />
            ))}
          </Picker>
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton} accessibilityLabel="Cancel">
              <Text style={[styles.cancelText, { color: COLORS.text }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton} accessibilityLabel="Save task">
              <Text style={styles.saveText}>{initialTask ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

function getStyles(COLORS: any, CARD_RADIUS: number) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: COLORS.card,
      borderRadius: CARD_RADIUS,
      padding: 20,
      width: '90%',
    },
    header: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
    input: {
      borderWidth: 1,
      borderColor: COLORS.background,
      borderRadius: 10,
      padding: 10,
      marginBottom: 12,
      backgroundColor: COLORS.background,
    },
    picker: { marginBottom: 12 , color: COLORS.text},
    dateButton: {
      backgroundColor: COLORS.background,
      borderRadius: 10,
      padding: 10,
      marginBottom: 12,
    },
    dateText: {},
    actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
    cancelButton: { padding: 10 },
    cancelText: {},
    saveButton: {
      backgroundColor: COLORS.accent,
      borderRadius: 10,
      padding: 10,
    },
    saveText: { color: '#fff', fontWeight: '600' },
  });
}

// TODO: Add accessibility improvements, validation, and support for notes
