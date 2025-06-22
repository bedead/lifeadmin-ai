import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { BottomNav } from '../../components/BottomNav';
import { CalendarView } from '../../components/CalendarView';
import { TaskForm } from '../../components/TaskForm';
import { TaskList } from '../../components/TaskList';
import { COLORS } from '../../constants/Colors';
import { useTasks } from '../../state/TaskContext';
import { Task } from '../../types/task';
import SettingsScreen from './settings';

export default function HomeScreen() {
  const { tasks, addTask, updateTask, markDone } = useTasks();
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'add' | 'settings'>('home');
  const [formVisible, setFormVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | undefined>(undefined);

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setFormVisible(true);
  };

  const handleAdd = () => {
    setEditTask(undefined);
    setFormVisible(true);
  };

  const handleSubmit = (task: Task) => {
    if (editTask) updateTask(task);
    else addTask(task);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Life Admin AI</Text>
      </View> */}
      <View style={styles.container}>
        {activeTab === 'home' && (
          <>
            <TaskList tasks={tasks} onEdit={handleEdit} onDone={(task) => markDone(task.id)} />
            {/* <TouchableOpacity
              style={styles.fab}
              onPress={() => { setEditTask(undefined); setFormVisible(true); }}
              accessibilityLabel="Add Task"
            >
              <MaterialCommunityIcons name="plus" size={32} color="#fff" />
            </TouchableOpacity> */}
          </>
        )}
        {activeTab === 'calendar' && (
          <CalendarView tasks={tasks} />
        )}
        {activeTab === 'settings' && (
          <SettingsScreen />
        )}
        <TaskForm
          visible={formVisible || activeTab === 'add'}
          onClose={() => { setFormVisible(false); setActiveTab('home'); }}
          onSubmit={handleSubmit}
          initialTask={editTask}
        />
      </View>
      <BottomNav activeTab={activeTab} onTabPress={tab => {
        if (tab === 'add') setFormVisible(true);
        else setActiveTab(tab as any);
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
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
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 88,
    backgroundColor: COLORS.accent,
    borderRadius: 32,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
});

// TODO: Add FAB animation, and better modal transitions
