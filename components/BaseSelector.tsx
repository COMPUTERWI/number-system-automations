import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react-native';

interface BaseSelectorProps {
  label: string;
  selectedBase: number;
  onSelectBase: (base: number) => void;
}

const COMMON_BASES = [
  { value: 2, label: 'Binary (2)' },
  { value: 8, label: 'Octal (8)' },
  { value: 10, label: 'Decimal (10)' },
  { value: 16, label: 'Hexadecimal (16)' },
];

const ALL_BASES = Array.from({ length: 35 }, (_, i) => ({
  value: i + 2,
  label: `Base ${i + 2}`,
}));

export function BaseSelector({ label, selectedBase, onSelectBase }: BaseSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const getBaseLabel = (base: number) => {
    const common = COMMON_BASES.find(b => b.value === base);
    return common ? common.label : `Base ${base}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.selectorText}>{getBaseLabel(selectedBase)}</Text>
        <ChevronDown size={20} color="#64748b" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Base</Text>

            <Text style={styles.sectionTitle}>Common Bases</Text>
            <View style={styles.commonBases}>
              {COMMON_BASES.map(base => (
                <TouchableOpacity
                  key={base.value}
                  style={[
                    styles.baseOption,
                    selectedBase === base.value && styles.baseOptionSelected,
                  ]}
                  onPress={() => {
                    onSelectBase(base.value);
                    setModalVisible(false);
                  }}>
                  <Text
                    style={[
                      styles.baseOptionText,
                      selectedBase === base.value && styles.baseOptionTextSelected,
                    ]}>
                    {base.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>All Bases (2-36)</Text>
            <ScrollView style={styles.scrollView}>
              {ALL_BASES.map(base => (
                <TouchableOpacity
                  key={base.value}
                  style={[
                    styles.listOption,
                    selectedBase === base.value && styles.listOptionSelected,
                  ]}
                  onPress={() => {
                    onSelectBase(base.value);
                    setModalVisible(false);
                  }}>
                  <Text
                    style={[
                      styles.listOptionText,
                      selectedBase === base.value && styles.listOptionTextSelected,
                    ]}>
                    {base.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
  },
  selectorText: {
    fontSize: 16,
    color: '#1e293b',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 12,
    marginBottom: 8,
  },
  commonBases: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  baseOption: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  baseOptionSelected: {
    backgroundColor: '#2563eb',
  },
  baseOptionText: {
    fontSize: 14,
    color: '#1e293b',
  },
  baseOptionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  scrollView: {
    maxHeight: 300,
  },
  listOption: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  listOptionSelected: {
    backgroundColor: '#eff6ff',
  },
  listOptionText: {
    fontSize: 16,
    color: '#1e293b',
  },
  listOptionTextSelected: {
    color: '#2563eb',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#f1f5f9',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
});
