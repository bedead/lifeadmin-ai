import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card } from '../types/card';
import { ThemedText } from './ThemedText';

interface Props {
    card: Card;
    onEdit: () => void;
    onRemove: () => void;
}

export const CardView: React.FC<Props> = ({ card, onEdit, onRemove }) => {
    const [flipped, setFlipped] = useState(false);
    const cardColor = card.brandingColor || useThemeColor({}, 'card');
    const textColor = useThemeColor({}, 'text');
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    // Animate flip
    const flipCard = () => {
        Animated.timing(animatedValue, {
            toValue: flipped ? 0 : 1,
            duration: 400,
            useNativeDriver: true,
        }).start(() => setFlipped(!flipped));
    };

    const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });
    const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    return (
        <TouchableOpacity activeOpacity={0.95} onPress={flipCard}>
            <Animated.View style={[styles.card, { backgroundColor: cardColor, transform: [{ rotateY: frontInterpolate }] }]}>
                <ThemedText type="defaultSemiBold" style={{ color: textColor }}>{card.cardholderName}</ThemedText>
                <ThemedText style={{ color: textColor }}>{card.bankName}</ThemedText>
                <View style={styles.row}>
                    <ThemedText style={{ color: textColor }}>{card.cardType}</ThemedText>
                    <ThemedText style={{ color: textColor, marginLeft: 12 }}>•••• {card.cardNumber}</ThemedText>
                </View>
                <ThemedText style={{ color: textColor }}>Exp: {card.expiry}</ThemedText>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={onEdit} accessibilityLabel="Edit card">
                        <FontAwesome name="pencil" size={20} color={textColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onRemove} accessibilityLabel="Remove card" style={{ marginLeft: 12 }}>
                        <FontAwesome name="trash" size={20} color="crimson" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            <Animated.View style={[styles.card, styles.cardBack, { backgroundColor: cardColor, transform: [{ rotateY: backInterpolate }] }]}>
                <ThemedText style={{ color: textColor }}>CVV: {card.cvv || '•••'}</ThemedText>
                <ThemedText style={{ color: textColor }}>{card.notes}</ThemedText>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 3,
        backfaceVisibility: 'hidden',
    },
    cardBack: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    actions: { flexDirection: 'row', marginTop: 12 },
});
