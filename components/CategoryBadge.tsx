import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TASK_CATEGORIES } from '../constants/categories';

interface Props {
    categoryKey: string;
}

export const CategoryBadge: React.FC<Props> = ({ categoryKey }) => {
    const category = TASK_CATEGORIES.find(c => c.key === categoryKey);
    if (!category) return null;
    return (
        <View style={[styles.badge, { backgroundColor: category.color }]}>
            <MaterialCommunityIcons name={category.icon as any} size={16} color="#fff" style={{ marginRight: 4 }} />
            <Text style={styles.label}>{category.label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
    },
    label: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
    },
});

// TODO: Add accessibilityLabel and test with screen readers
