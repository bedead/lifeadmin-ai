import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TASK_CATEGORIES } from '../constants/categories';
import { COLORS } from '../constants/Colors';
import { Task } from '../types/task';
import { CategoryBadge } from './CategoryBadge';
import { TaskCard } from './TaskCard';

interface Props {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDone: (task: Task) => void;
}

export const TaskList: React.FC<Props> = ({ tasks, onEdit, onDone }) => {
    if (!tasks.length) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>All clear! Nothing pending 🎉</Text>
            </View>
        );
    }

    // Group tasks by category
    const grouped = TASK_CATEGORIES.map(cat => ({
        ...cat,
        tasks: tasks.filter(t => t.category === cat.key),
    })).filter(group => group.tasks.length > 0);

    return (
        <FlatList
            data={grouped}
            keyExtractor={item => item.key}
            renderItem={({ item }) => (
                <View style={styles.group}>
                    <CategoryBadge categoryKey={item.key} />
                    {item.tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={() => onEdit(task)}
                            onDone={() => onDone(task)}
                        />
                    ))}
                </View>
            )}
            contentContainerStyle={{ paddingBottom: 32 }}
        />
    );
};

const styles = StyleSheet.create({
    group: { marginBottom: 24 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
    emptyText: { color: COLORS.text, fontSize: 16, opacity: 0.7 },
});

// TODO: Add sorting, filtering, and swipe-to-delete
