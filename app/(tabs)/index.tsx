import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TaskList } from '../../components/TaskList';
import { TaskForm } from '../../components/TaskForm';
import { ThemedView } from '../../components/ThemedView';
import { AddFabMenu } from '../../components/ui/AddFabMenu';
import { useCards } from '../../state/CardContext';
import { useDocuments } from '../../state/DocumentContext';
import { useTasks } from '../../state/TaskContext';
import { Task } from '../../types/task';

export default function TabsHome() {
    const { tasks, addTask, updateTask, markDone } = useTasks();
    const { addCard } = useCards();
    const { addDocument } = useDocuments();
    const [taskModelVisible, setModelTaskVisible] = useState(false);
    const [editTask, setEditTask] = useState<Task | undefined>(undefined);
    const [fabMenuVisible, setFabMenuVisible] = useState(false);
    const [cardModalVisible, setCardModalVisible] = useState(false);
    const [documentModalVisible, setDocumentModalVisible] = useState(false);

    // Card form state
    const [cardholderName, setCardholderName] = useState('');
    const [bankName, setBankName] = useState('');
    const [cardType, setCardType] = useState<'Visa' | 'Mastercard' | 'Rupay' | 'Amex' | 'Other'>('Visa');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardNotes, setCardNotes] = useState('');
    const [brandingColor, setBrandingColor] = useState('');

    // Document form state
    const [docTitle, setDocTitle] = useState('');
    const [docNotes, setDocNotes] = useState('');
    const [fileUri, setFileUri] = useState('');
    const [fileType, setFileType] = useState<'image' | 'pdf' | 'other'>('pdf');
    const [thumbnailUri, setThumbnailUri] = useState('');


    const COLORS = {
        background: useThemeColor({}, 'background'),
        card: useThemeColor({}, 'card'),
        accent: useThemeColor({}, 'accent'),
        shadowColor: useThemeColor({}, 'shadow'),
        headText: useThemeColor({}, 'headText'),
        subText: useThemeColor({}, 'subText'),
        alert: useThemeColor({}, 'alert'),
        success: useThemeColor({}, 'success'),
    };

    const styles = getMainStyles(COLORS);
    const modalStyles = getModelStyles(COLORS);

    const handleEditTask = (task: Task) => {
        setEditTask(task);
        setModelTaskVisible(true);
    };

    const handleAddTask = () => {
        setEditTask(undefined);
        setModelTaskVisible(true);
    };

    const handleSubmitTask = (task: Task) => {
        if (editTask) updateTask(task);
        else addTask(task);
    };

    const handleAddCard = async () => {
        await addCard({
            cardholderName,
            bankName,
            cardType,
            cardNumber,
            expiry,
            cvv: cvv || undefined,
            notes: cardNotes || undefined,
            brandingColor: brandingColor || undefined,
        });
        setCardModalVisible(false);
        setCardholderName('');
        setBankName('');
        setCardType('Visa');
        setCardNumber('');
        setExpiry('');
        setCvv('');
        setCardNotes('');
        setBrandingColor('');
    };

    const handleAddDocument = async () => {
        await addDocument({
            title: docTitle,
            notes: docNotes || undefined,
            fileUri,
            fileType,
            thumbnailUri: thumbnailUri || undefined,
        });
        setDocumentModalVisible(false);
        setDocTitle('');
        setDocNotes('');
        setFileUri('');
        setFileType('pdf');
        setThumbnailUri('');
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: COLORS.background }]}>
            <ThemedView style={[styles.container, { backgroundColor: COLORS.background }]}>
                <TaskList tasks={tasks} onEdit={handleEditTask} onDone={(task) => markDone(task.id)} />
                {!fabMenuVisible && (
                    <TouchableOpacity
                        style={[styles.fab, { backgroundColor: COLORS.accent, shadowColor: COLORS.shadowColor }]}
                        onPress={() => setFabMenuVisible(true)}
                        accessibilityLabel="Add menu"
                        activeOpacity={0.85}
                    >
                        <FontAwesome name="plus" size={24} color={COLORS.background} />
                    </TouchableOpacity>
                )}
                <AddFabMenu
                    visible={fabMenuVisible}
                    onClose={() => setFabMenuVisible(false)}
                    onAddDocument={() => { setFabMenuVisible(false); setDocumentModalVisible(true); }}
                    onAddCard={() => { setFabMenuVisible(false); setCardModalVisible(true); }}
                    onAddTask={() => { setFabMenuVisible(false); handleAddTask(); }}
                />
                {/* Card Modal */}
                <Modal visible={cardModalVisible} animationType="slide" transparent>
                    <View style={modalStyles.overlay}>
                        <View style={[modalStyles.container, styles.cardModal]}>
                            <Text style={modalStyles.header}>Add Card</Text>
                            <TextInput style={modalStyles.input} placeholder="Cardholder Name" value={cardholderName} onChangeText={setCardholderName} />
                            <TextInput style={modalStyles.input} placeholder="Bank Name" value={bankName} onChangeText={setBankName} />
                            <TextInput style={modalStyles.input} placeholder="Card Type (Visa, Mastercard, etc)" value={cardType} onChangeText={t => setCardType(t as any)} />
                            <TextInput style={modalStyles.input} placeholder="Card Nunber" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" maxLength={4} />
                            <TextInput style={modalStyles.input} placeholder="Expiry (MM/YY)" value={expiry} onChangeText={setExpiry} />
                            <TextInput style={modalStyles.input} placeholder="CVV (optional)" value={cvv} onChangeText={setCvv} keyboardType="numeric" maxLength={4} />
                            <TextInput style={modalStyles.input} placeholder="Notes (optional)" value={cardNotes} onChangeText={setCardNotes} />
                            <TextInput style={modalStyles.input} placeholder="Branding Color (hex, optional)" value={brandingColor} onChangeText={setBrandingColor} />
                            <View style={modalStyles.actions}>
                                <TouchableOpacity onPress={() => setCardModalVisible(false)} style={modalStyles.cancelButton}><Text>Cancel</Text></TouchableOpacity>
                                <TouchableOpacity onPress={handleAddCard} style={modalStyles.saveButton}><Text style={modalStyles.saveText}>Add</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Document Modal */}
                <Modal visible={documentModalVisible} animationType="slide" transparent>
                    <View style={modalStyles.overlay}>
                        <View style={[modalStyles.container, styles.cardModal]}>
                            <Text style={modalStyles.header}>Add Document</Text>
                            <TextInput style={modalStyles.input} placeholder="Title" value={docTitle} onChangeText={setDocTitle} />
                            <TextInput style={modalStyles.input} placeholder="Notes (optional)" value={docNotes} onChangeText={setDocNotes} />
                            <TextInput style={modalStyles.input} placeholder="File URI" value={fileUri} onChangeText={setFileUri} />
                            <TextInput style={modalStyles.input} placeholder="File Type (pdf, image, other)" value={fileType} onChangeText={t => setFileType(t as any)} />
                            <TextInput style={modalStyles.input} placeholder="Thumbnail URI (optional)" value={thumbnailUri} onChangeText={setThumbnailUri} />
                            <View style={modalStyles.actions}>
                                <TouchableOpacity onPress={() => setDocumentModalVisible(false)} style={modalStyles.cancelButton}><Text>Cancel</Text></TouchableOpacity>
                                <TouchableOpacity onPress={handleAddDocument} style={modalStyles.saveButton}><Text style={modalStyles.saveText}>Add</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TaskForm visible={taskModelVisible} onClose={() => setModelTaskVisible(false)} onSubmit={handleSubmitTask} />

            </ThemedView>
        </SafeAreaView >
    );
}
function getMainStyles(COLORS: any) {
    return StyleSheet.create({
        safe: { flex: 1 },
        container: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
        fab: {
            position: 'absolute',
            alignSelf: 'center',
            bottom: 20, // floats above tab bar, adjust as needed
            right: 32,
            borderRadius: 32,
            width: 58,
            height: 58,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
        },
        cardModal: { minWidth: 300 },
    });
}
function getModelStyles(COLORS: any) {
    return StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            backgroundColor: COLORS.card,
            borderRadius: 16,
            padding: 20,
            width: '90%',
        },
        header: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
        input: {
            borderWidth: 1,
            borderColor: COLORS.background,
            borderRadius: 10,
            padding: 10,
            marginBottom: 12,
            backgroundColor: COLORS.background,
        },
        actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
        cancelButton: { padding: 10 },
        saveButton: {
            backgroundColor: COLORS.accent,
            borderRadius: 10,
            padding: 10,
        },
        saveText: { color: '#fff', fontWeight: '600' },
    });
}

// TODO: Add FAB animation, and better modal transitions
// TODO: Add file picker for document modal, color picker for card modal, and validation
