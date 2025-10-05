import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { BaseSelector } from '@/components/BaseSelector';
import { StepsDisplay } from '@/components/StepsDisplay';
import { convert, isValidNumber } from '@/utils/converter';
import { ConversionResult } from '@/types/conversion';
import { ArrowRight, Share2, RotateCcw, Save } from 'lucide-react-native';
import { supabase } from '@/utils/supabase';

export default function ConverterScreen() {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState('');

  const handleConvert = () => {
    setError('');
    setResult(null);

    if (!input.trim()) {
      setError('Please enter a number');
      return;
    }

    if (!isValidNumber(input, fromBase)) {
      setError(`Invalid number for base ${fromBase}`);
      return;
    }

    try {
      const conversionResult = convert(input, fromBase, toBase);
      setResult(conversionResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  };

  const handleSave = async () => {
    if (!result) return;

    try {
      const { error: saveError } = await supabase
        .from('conversions')
        .insert({
          input: result.input,
          output: result.output,
          from_base: result.fromBase,
          to_base: result.toBase,
          steps: result.steps,
        });

      if (saveError) throw saveError;
      Alert.alert('Success', 'Conversion saved to history');
    } catch (err) {
      Alert.alert('Error', 'Failed to save conversion');
    }
  };

  const handleExport = () => {
    if (!result) return;

    const text = `Number System Conversion
Input: ${result.input} (Base ${result.fromBase})
Output: ${result.output} (Base ${result.toBase})

Step-by-Step Conversion:
${result.steps.map((step, i) => `${i + 1}. ${step.description}${step.calculation ? '\n   ' + step.calculation : ''}${step.result ? '\n   Result: ' + step.result : ''}`).join('\n\n')}`;

    Alert.alert('Export', text, [
      { text: 'OK', style: 'default' }
    ]);
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  const swapBases = () => {
    const temp = fromBase;
    setFromBase(toBase);
    setToBase(temp);
    if (result) {
      setInput(result.output);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Number System Converter</Text>
          <Text style={styles.subtitle}>Convert between bases 2-36</Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Input Number</Text>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Enter number"
            placeholderTextColor="#94a3b8"
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.baseSelectors}>
          <View style={styles.baseSelectorWrapper}>
            <BaseSelector
              label="From Base"
              selectedBase={fromBase}
              onSelectBase={setFromBase}
            />
          </View>

          <TouchableOpacity style={styles.swapButton} onPress={swapBases}>
            <ArrowRight size={24} color="#2563eb" />
          </TouchableOpacity>

          <View style={styles.baseSelectorWrapper}>
            <BaseSelector
              label="To Base"
              selectedBase={toBase}
              onSelectBase={setToBase}
            />
          </View>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultSection}>
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Result</Text>
              <Text style={styles.resultValue}>{result.output}</Text>
              <Text style={styles.resultInfo}>
                {result.input} (Base {result.fromBase}) = {result.output} (Base {result.toBase})
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
                <Save size={20} color="#2563eb" />
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleExport}>
                <Share2 size={20} color="#2563eb" />
                <Text style={styles.actionButtonText}>Export</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleReset}>
                <RotateCcw size={20} color="#2563eb" />
                <Text style={styles.actionButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>

            <StepsDisplay steps={result.steps} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    color: '#1e293b',
  },
  baseSelectors: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  baseSelectorWrapper: {
    flex: 1,
  },
  swapButton: {
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  convertButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  convertButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  resultSection: {
    marginTop: 8,
  },
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  resultLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 8,
  },
  resultInfo: {
    fontSize: 13,
    color: '#64748b',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
});
