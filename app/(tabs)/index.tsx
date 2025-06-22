import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TaskList } from '../../components/TaskList';
import { ThemedView } from '../../components/ThemedView';
import { COLORS } from '../../constants/Colors';
import { useTasks } from '../../state/TaskContext';
import { Task } from '../../types/task';

export default function TabsHome() {
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
            <ThemedView style={styles.container}>
                <TaskList tasks={tasks} onEdit={handleEdit} onDone={(task) => markDone(task.id)} />
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
