import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { DocumentCard } from '../../components/DocumentCard';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useThemeColor } from '../../hooks/useThemeColor';
import { DocumentProvider, useDocuments } from '../../state/DocumentContext';

function DocumentsScreenContent() {
  const { documents, removeDocument } = useDocuments();
  const [fabMenuVisible, setFabMenuVisible] = React.useState(false);
  const accentColor = useThemeColor({}, 'accent');
  const backgroundColor = useThemeColor({}, 'background');
  const shadowColor = useThemeColor({}, 'shadow');

  return (
    <ThemedView style={styles.container}>
      {documents.length === 0 ? (
        <View style={styles.empty}>
          <ThemedText style={styles.emptyText}>No documents yet. Add your important documents for quick access!</ThemedText>
        </View>
      ) : (
        documents.map(doc => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onView={() => { /* TODO: Open file */ }}
            onEdit={() => { /* TODO: Edit document */ }}
            onRemove={() => removeDocument(doc.id)}
          />
        ))
      )}
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