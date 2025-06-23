import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Animated, Easing, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

interface AddFabMenuProps {
    visible: boolean;
    onClose: () => void;
    onAddDocument: () => void;
    onAddCard: () => void;
    onAddTask: () => void;
}

export const AddFabMenu: React.FC<AddFabMenuProps> = ({ visible, onClose, onAddDocument, onAddCard, onAddTask }) => {
    const accentColor = useThemeColor({}, 'accent');
    const borderColor = useThemeColor({}, 'border');
    const backgroundColor = useThemeColor({}, 'background');
    const [rotate] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(rotate, {
            toValue: visible ? 1 : 0,
            duration: 350,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const rotation = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
    });

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
            <View style={styles.menuContainer}>
                <TouchableOpacity style={[styles.menuItem, { borderColor: borderColor, backgroundColor: backgroundColor }]} onPress={onAddDocument}>
                    <FontAwesome name="file" size={22} color={accentColor} />
                    {/* <ThemedText style={styles.menuLabel}>Document</ThemedText> */}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuItem, { borderColor: borderColor, backgroundColor: backgroundColor }]} onPress={onAddCard}>
                    <FontAwesome name="credit-card" size={22} color={accentColor} />
                    {/* <ThemedText style={styles.menuLabel}>Card/ID</ThemedText> */}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.menuItem, { borderColor: borderColor, backgroundColor: backgroundColor }]} onPress={onAddTask}>
                    <FontAwesome name="plus" size={22} color={accentColor} />
                    {/* <ThemedText style={styles.menuLabel}>Task</ThemedText> */}
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={onClose}
                style={styles.fab}
            >
                <Animated.View style={[StyleSheet.absoluteFill, { borderRadius: 32, borderColor: borderColor, backgroundColor: accentColor, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: rotation }] }]}> 
                    <FontAwesome name="plus" size={24} color={backgroundColor} />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
        justifyContent: 'flex-end', 
        alignItems: 'center',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.18)',
    },
    menuContainer: {
        flexDirection: 'column',
        marginBottom: 100,
        gap: 4,
        position: 'absolute',
        right: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItem: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        marginBottom: 4,
    },
    menuLabel: {
        fontSize: 12,
        marginTop: 2,
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 32,
        width: 58,
        height: 58,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
