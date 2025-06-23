import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import TabBarBackground from '../../components/ui/TabBarBackground';
import { useThemeColor } from '../../hooks/useThemeColor';



export default function TabLayout() {
    const accentColor = useThemeColor({}, 'accent');
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: accentColor,
                // tabBarBackground: () => <TabBarBackground />, // Custom seamless background
                tabBarAccessibilityLabel: 'Bottom navigation',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} accessibilityLabel="Home" />, // accessibility
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: 'Calendar',
                    headerShown: false,
                    href: null,
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name="calendar" color={color} accessibilityLabel="Calendar" />, // accessibility
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name="cog" color={color} accessibilityLabel="Settings" />, // accessibility
                }}
            />
        </Tabs>
    );
}
