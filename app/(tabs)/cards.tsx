import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CardView } from '../../components/CardView';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useThemeColor } from '../../hooks/useThemeColor';
import { CardProvider, useCards } from '../../state/CardContext';

function CardsScreenContent() {
    const { cards, removeCard } = useCards();
    const accentColor = useThemeColor({}, 'accent');
    const backgroundColor = useThemeColor({}, 'background');
    const shadowColor = useThemeColor({}, 'shadow');
    return (
        <ThemedView style={styles.container}>
            {cards.length === 0 ? (
                <View style={styles.empty}>
                    <ThemedText style={styles.emptyText}>No cards yet. Add your credit or debit cards for quick access!</ThemedText>
                </View>
            ) : (
                cards.map(card => (
                    <CardView
                        key={card.id}
                        card={card}
                        onEdit={() => { /* TODO: Edit card */ }}
                        onRemove={() => removeCard(card.id)}
                    />
                ))
            )}
        </ThemedView>
    );
}

export default function CardsScreen() {
    return (
        <CardProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <CardsScreenContent />
            </SafeAreaView>
        </CardProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
    emptyText: { fontSize: 16, opacity: 0.7 },
    fab: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 32,
        borderRadius: 32,
        width: 58,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        elevation: 4,
    },
});