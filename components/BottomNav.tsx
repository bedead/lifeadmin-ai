import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/Colors';
import { CARD_SHADOW } from './TaskCard';

interface Tab {
  key: string;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'calendar', label: 'Calendar', icon: 'calendar-month-outline' },
  { key: 'documents', label: 'Documents', icon: 'file-document-outline' },
  { key: 'cards', label: 'Cards', icon: 'credit-card-outline' },
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
          color={activeTab === tab.key ? '#fff' : 'rgba(255,255,255,0.7)'}
        />
        <Text style={[styles.label, activeTab === tab.key ? { color: '#fff' } : { color: 'rgba(255,255,255,0.7)' }]}>{tab.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    flexDirection: 'row',
    backgroundColor: COLORS.accent,
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...CARD_SHADOW,
    zIndex: 100,
  },
  tab: { alignItems: 'center', flex: 1 },
  label: { fontSize: 12, color: '#fff', marginTop: 2, fontWeight: '600' },
});

// TODO: Add haptic feedback and accessibility improvements
