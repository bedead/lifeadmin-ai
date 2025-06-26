import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useThemeColor } from '../../hooks/useThemeColor';

interface BottomTab {
    key: string;
    label: string;
    icon: string;
    disabled: boolean;
}
const BottomTab: BottomTab[] = [
    { key: 'index', label: 'Home', icon: 'home', disabled: false },
    { key: 'cards', label: 'Cards', icon: 'credit-card', disabled: false },
    { key: 'documents', label: 'Documents', icon: 'file', disabled: false },
    { key: 'calendar', label: 'Calendar', icon: 'calendar', disabled: true },
    { key: 'settings', label: 'Settings', icon: 'cog', disabled: false },
];

export default function TabLayout() {
    const COLORS = {
        accentColor: useThemeColor({}, 'accent'),
        backgroundColor: useThemeColor({}, 'background'),
        cardColor: useThemeColor({}, 'card'),
    }
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.accentColor,
                tabBarStyle: {
                    backgroundColor: COLORS.cardColor,
                    height: 80, // 👈 Increase height here (default is ~49-56)
                    paddingBottom: 10, // optional: add padding if icons look uncentered
                    paddingTop: 10,
                },
                // tabBarBackground: () => <TabBarBackground />, // Custom seamless background
                tabBarAccessibilityLabel: 'Bottom navigation',
            }}
        >
            {BottomTab.map(tab => (
                <Tabs.Screen key={tab.key} name={tab.key} options={{
                    title: tab.label,
                    headerShown: false,
                    href: tab.disabled ? null : undefined,
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name={tab.icon as any} color={color} accessibilityLabel={tab.label} />, // accessibility
                }} />
            ))}
        </Tabs>
    );
}
