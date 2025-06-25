import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Document } from '../types/document';
import { ThemedText } from './ThemedText';

interface Props {
  document: Document;
  onView: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

export const DocumentCard: React.FC<Props> = ({ document, onView, onEdit, onRemove }) => {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const icon = document.fileType === 'pdf' ? 'file-pdf-o' : 'file-image-o';

  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}> 
      <View style={styles.row}>
        <FontAwesome name={icon} size={32} color={textColor} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <ThemedText type="defaultSemiBold">{document.title}</ThemedText>
          {document.notes ? (
            <ThemedText style={styles.notes}>{document.notes}</ThemedText>
          ) : null}
        </View>
        <TouchableOpacity onPress={onView} accessibilityLabel="View document">
          <FontAwesome name="eye" size={22} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} accessibilityLabel="Edit document" style={{ marginLeft: 12 }}>
          <FontAwesome name="pencil" size={20} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemove} accessibilityLabel="Remove document" style={{ marginLeft: 12 }}>
          <FontAwesome name="trash" size={20} color="crimson" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  notes: { fontSize: 13, opacity: 0.7, marginTop: 2 },
});
