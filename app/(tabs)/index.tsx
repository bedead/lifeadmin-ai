import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { TaskList } from '../../components/TaskList';
import { ThemedView } from '../../components/ThemedView';
import { AddFabMenu } from '../../components/ui/AddFabMenu';
import { useTasks } from '../../state/TaskContext';
import { Task } from '../../types/task';

export default function TabsHome() {
    const { tasks, addTask, updateTask, markDone } = useTasks();
    const [formVisible, setFormVisible] = useState(false);
    const [editTask, setEditTask] = useState<Task | undefined>(undefined);
    const [fabMenuVisible, setFabMenuVisible] = useState(false);

    const accentColor = useThemeColor({}, 'accent');
    const backgroundColor = useThemeColor({}, 'background');
    const shadowColor = useThemeColor({}, 'shadow');

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
        <SafeAreaView style={[styles.safe, { backgroundColor: backgroundColor }]}> {/* theme-aware */}
            <ThemedView style={[styles.container, { backgroundColor: backgroundColor }]}> {/* theme-aware */}
                <TaskList tasks={tasks} onEdit={handleEdit} onDone={(task) => markDone(task.id)} />
                {/* FAB Button */}
                <TouchableOpacity
                    style={[styles.fab, { backgroundColor: accentColor, shadowColor }]}
                    onPress={() => setFabMenuVisible(true)}
                    accessibilityLabel="Add menu"
                    activeOpacity={0.85}
                >
                    <FontAwesome name="plus" size={24} color={backgroundColor} />
                </TouchableOpacity>
                {/* FAB Menu Overlay */}
                <AddFabMenu
                    visible={fabMenuVisible}
                    onClose={() => setFabMenuVisible(false)}
                    onAddDocument={() => { setFabMenuVisible(false); /* TODO: Show add document modal */ }}
                    onAddCard={() => { setFabMenuVisible(false); /* TODO: Show add card modal */ }}
                    onAddTask={() => { setFabMenuVisible(false); handleAdd(); }}
                />
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    container: { flex: 1, padding: 8 },
    fab: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 20, // floats above tab bar, adjust as needed
        right: 32,
        borderRadius: 32,
        width: 58,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        elevation: 4,
    },
});

// TODO: Add FAB animation, and better modal transitions
