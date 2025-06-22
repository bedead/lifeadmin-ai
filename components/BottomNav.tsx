import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/Colors';

interface Tab {
  key: string;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'calendar', label: 'Calendar', icon: 'calendar-month-outline' },
  { key: 'add', label: 'Add', icon: 'plus-circle-outline' },
  { key: 'settings', label: 'Settings', icon: 'cog-outline' },
];

interface Props {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export const BottomNav: React.FC<Props> = ({ activeTab, onTabPress }) => (
  <View style={styles.container}>
    {TABS.map(tab => (
      <TouchableOpacity
        key={tab.key}
        style={styles.tab}
        onPress={() => onTabPress(tab.key)}
        accessibilityLabel={tab.label}
        accessibilityState={{ selected: activeTab === tab.key }}
      >
        <MaterialCommunityIcons
          name={tab.icon as any}
          size={28}
          color={activeTab === tab.key ? COLORS.accent : COLORS.text}
        />
        <Text style={[styles.label, activeTab === tab.key && { color: COLORS.accent }]}>{tab.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
    paddingVertical: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tab: { alignItems: 'center', flex: 1 },
  label: { fontSize: 12, color: COLORS.text, marginTop: 2 },
});

// TODO: Add haptic feedback and accessibility improvements
