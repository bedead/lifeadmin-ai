import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { COLORS } from '../constants/Colors';
import { TASK_CATEGORIES } from '../constants/categories';
import { RECURRENCE_OPTIONS } from '../constants/recurrence';
import { Task } from '../types/task';

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

  const handleSave = () => {
    const task: Task = {
      id: initialTask?.id || uuidv4(),
      title,
      category,
      dueDate: dueDate.toISOString(),
      recurrence: recurrence as 'none' | 'monthly' | 'yearly',
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
        <View style={styles.container}>
          <Text style={styles.header}>{initialTask ? 'Edit Task' : 'Add Task'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Task title"
            value={title}
            onChangeText={setTitle}
            accessibilityLabel="Task title"
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
            <Text style={styles.dateText}>Due: {dueDate.toLocaleDateString()}</Text>
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
              <Text style={styles.cancelText}>Cancel</Text>
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.background,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    backgroundColor: COLORS.background,
    color: COLORS.text,
  },
  picker: { marginBottom: 12 },
  dateButton: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  dateText: { color: COLORS.text },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  cancelButton: { padding: 10 },
  cancelText: { color: COLORS.text },
  saveButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    padding: 10,
  },
  saveText: { color: '#fff', fontWeight: '600' },
});

// TODO: Add accessibility improvements, validation, and support for notes
