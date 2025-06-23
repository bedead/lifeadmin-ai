import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { CardProvider, useCards } from '../../state/CardContext';

function CardsScreenContent() {
    const { cards } = useCards();
    return (
        <ThemedView style={styles.container}>
            {cards.length === 0 ? (
                <View style={styles.empty}>
                    <ThemedText style={styles.emptyText}>No cards yet. Add your credit or debit cards for quick access!</ThemedText>
                </View>
            ) : (
                // TODO: Map cards to CardView components
                <ThemedText>Card list goes here</ThemedText>
            )}
            {/* TODO: Add FAB for adding cards */}
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
    container: { flex: 1, padding: 8 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
    emptyText: { fontSize: 16, opacity: 0.7 },
}); 