import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ConversionStep } from '@/types/conversion';

interface StepsDisplayProps {
  steps: ConversionStep[];
}

export function StepsDisplay({ steps }: StepsDisplayProps) {
  if (steps.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step-by-Step Conversion</Text>
      <ScrollView style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.step}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
            {step.calculation && (
              <View style={styles.calculation}>
                <Text style={styles.calculationText}>{step.calculation}</Text>
              </View>
            )}
            {step.result && (
              <View style={styles.result}>
                <Text style={styles.resultLabel}>Result:</Text>
                <Text style={styles.resultValue}>{step.result}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  stepsContainer: {
    maxHeight: 400,
  },
  step: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  stepDescription: {
    flex: 1,
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  calculation: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginLeft: 40,
  },
  calculationText: {
    fontSize: 13,
    color: '#334155',
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 40,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginRight: 8,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
});
