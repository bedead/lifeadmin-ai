import { useThemeColor } from '@/hooks/useThemeColor';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';
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

  const COLORS = {
    background: useThemeColor({}, 'background'),
    card: useThemeColor({}, 'card'),
    accent: useThemeColor({}, 'accent'),
    headText: useThemeColor({}, 'headText'),
    subText: useThemeColor({}, 'subText'),
    fadedText: useThemeColor({}, 'fadedText'),
    alert: useThemeColor({}, 'alert'),
    success: useThemeColor({}, 'success'),
  };

  const styles = getStyles(COLORS);


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
        <View style={[styles.container]}>
          <Text style={[styles.header, { color: COLORS.headText }]}>{initialTask ? 'Edit Task' : 'Add Task'}</Text>
          <TextInput
            style={[styles.input]}
            placeholder="Task title"
            value={title}
            onChangeText={setTitle}
            accessibilityLabel="Task title"
            placeholderTextColor={COLORS.fadedText}
          />
          <Picker
            selectedValue={category}
            placeholder={category}
            onValueChange={setCategory}
            style={[styles.picker]}
            accessibilityLabel="Category"

          >
            {TASK_CATEGORIES.map(cat => (
              <Picker.Item key={cat.key} label={cat.label} value={cat.key} />
            ))}
          </Picker>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton} accessibilityLabel="Pick due date">
            <Text style={[styles.dateText]}>Due: {dueDate.toLocaleDateString()}</Text>
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
            <TouchableOpacity onPress={onClose} style={[styles.cancelButton]} accessibilityLabel="Cancel">
              <Text style={[styles.buttonText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton} accessibilityLabel="Save task">
              <Text style={styles.buttonText}>{initialTask ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

function getStyles(COLORS: any) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      elevation: 8,
      backgroundColor: COLORS.card,
      borderRadius: 22,
      padding: 24,
      width: '90%',
    },
    header: { fontSize: 22, fontWeight: '700', marginBottom: 20, alignSelf: 'center' },
    input: {
      color: COLORS.fadedText,
      borderWidth: 1,
      borderColor: COLORS.background,
      borderRadius: 10,
      padding: 10,
      marginBottom: 8,
      backgroundColor: COLORS.background,
    },
    picker: { marginBottom: 8, color: COLORS.fadedText },
    dateButton: {
      backgroundColor: COLORS.background,
      borderRadius: 10,
      padding: 10,
      marginBottom: 8,
    },
    dateText: { color: COLORS.fadedText },
    actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
    cancelButton: { padding: 10, borderRadius: 10, backgroundColor: COLORS.alert },
    buttonText: { color: COLORS.headText, fontWeight: '600' },
    saveButton: {
      backgroundColor: COLORS.success,
      borderRadius: 10,
      padding: 10,
    },
  });
}

// TODO: Add accessibility improvements, validation, and support for notes
