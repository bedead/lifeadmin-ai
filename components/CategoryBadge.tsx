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
            <Text style={[styles.text, { color: '#fff' }]}>{category.label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginTop: 8,
        marginBottom: 8,
    },
    text: {
        fontWeight: '600',
        fontSize: 13,
        marginLeft: 4,
    },
});

// TODO: Add accessibilityLabel and test with screen readers
