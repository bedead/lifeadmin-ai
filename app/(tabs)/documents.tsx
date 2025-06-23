import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { DocumentProvider, useDocuments } from '../../state/DocumentContext';

function DocumentsScreenContent() {
  const { documents } = useDocuments();
  return (
    <ThemedView style={styles.container}>
      {documents.length === 0 ? (
        <View style={styles.empty}>
          <ThemedText style={styles.emptyText}>No documents yet. Add your important documents for quick access!</ThemedText>
        </View>
      ) : (
        // TODO: Map documents to DocumentCard components
        <ThemedText>Document list goes here</ThemedText>
      )}
      {/* TODO: Add FAB for adding documents */}
    </ThemedView>
  );
}

export default function DocumentsScreen() {
  return (
    <DocumentProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <DocumentsScreenContent />
      </SafeAreaView>
    </DocumentProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyText: { fontSize: 16, opacity: 0.7 },
}); 