import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { getBaseLabel } from '@/utils/converter';
import { Trash2, RefreshCw } from 'lucide-react-native';

interface HistoryItem {
  id: string;
  input: string;
  output: string;
  from_base: number;
  to_base: number;
  created_at: string;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('conversions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      Alert.alert('Error', 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('conversions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Delete Conversion',
      'Are you sure you want to delete this conversion?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteItem(id) },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyContent}>
        <View style={styles.conversionInfo}>
          <Text style={styles.baseLabel}>{getBaseLabel(item.from_base)}</Text>
          <Text style={styles.arrow}>→</Text>
          <Text style={styles.baseLabel}>{getBaseLabel(item.to_base)}</Text>
        </View>
        <View style={styles.values}>
          <Text style={styles.inputValue}>{item.input}</Text>
          <Text style={styles.arrow}>=</Text>
          <Text style={styles.outputValue}>{item.output}</Text>
        </View>
        <Text style={styles.timestamp}>{formatDate(item.created_at)}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item.id)}>
        <Trash2 size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversion History</Text>
        <TouchableOpacity onPress={loadHistory} style={styles.refreshButton}>
          <RefreshCw size={20} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      ) : history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No conversions yet</Text>
          <Text style={styles.emptySubtext}>
            Your saved conversions will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  refreshButton: {
    padding: 8,
  },
  list: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  historyContent: {
    flex: 1,
  },
  conversionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  baseLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  arrow: {
    fontSize: 14,
    color: '#94a3b8',
    marginHorizontal: 8,
  },
  values: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  outputValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
  timestamp: {
    fontSize: 12,
    color: '#94a3b8',
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
