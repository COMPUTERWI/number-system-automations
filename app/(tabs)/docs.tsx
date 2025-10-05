import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BookOpen, Users, GitBranch, TestTube } from 'lucide-react-native';

export default function DocsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.iconHeader}>
            <BookOpen size={24} color="#2563eb" />
            <Text style={styles.sectionTitle}>About</Text>
          </View>
          <Text style={styles.text}>
            Number System Converter is a cross-platform mobile app for converting numbers between different bases (2-36), including Binary, Octal, Decimal, and Hexadecimal.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.iconHeader}>
            <TestTube size={24} color="#2563eb" />
            <Text style={styles.sectionTitle}>Features</Text>
          </View>
          <Text style={styles.feature}>• Convert between bases 2-36</Text>
          <Text style={styles.feature}>• Step-by-step conversion display</Text>
          <Text style={styles.feature}>• Save conversion history</Text>
          <Text style={styles.feature}>• Export results as text</Text>
          <Text style={styles.feature}>• Input validation</Text>
          <Text style={styles.feature}>• Fast and accurate conversions</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.iconHeader}>
            <Users size={24} color="#2563eb" />
            <Text style={styles.sectionTitle}>Development Team</Text>
          </View>
          <Text style={styles.role}>Project Manager: Requirements & Planning</Text>
          <Text style={styles.role}>Frontend Developer: UI/UX Implementation</Text>
          <Text style={styles.role}>Backend Developer: Conversion Logic & APIs</Text>
          <Text style={styles.role}>QA Engineer: Testing & Quality Assurance</Text>
          <Text style={styles.role}>DevOps Engineer: Deployment & CI/CD</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.iconHeader}>
            <GitBranch size={24} color="#2563eb" />
            <Text style={styles.sectionTitle}>Technology Stack</Text>
          </View>
          <Text style={styles.tech}>• React Native + Expo</Text>
          <Text style={styles.tech}>• TypeScript</Text>
          <Text style={styles.tech}>• Supabase (Database)</Text>
          <Text style={styles.tech}>• Lucide Icons</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Algorithm Overview</Text>
          <Text style={styles.text}>
            The conversion process uses a two-step algorithm:
          </Text>
          <Text style={styles.step}>
            1. Convert input from source base to decimal using positional notation
          </Text>
          <Text style={styles.step}>
            2. Convert decimal to target base using repeated division
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Guide</Text>
          <Text style={styles.step}>1. Enter a number in the input field</Text>
          <Text style={styles.step}>2. Select the source base (From Base)</Text>
          <Text style={styles.step}>3. Select the target base (To Base)</Text>
          <Text style={styles.step}>4. Tap "Convert" to see the result</Text>
          <Text style={styles.step}>5. View step-by-step conversion details</Text>
          <Text style={styles.step}>6. Save or export the conversion</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supported Bases</Text>
          <Text style={styles.text}>
            Common: Binary (2), Octal (8), Decimal (10), Hexadecimal (16)
          </Text>
          <Text style={styles.text}>
            All bases from 2 to 36 are supported using digits 0-9 and letters A-Z.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.copyright}>Built with React Native + Expo</Text>
        </View>
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
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  iconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    marginLeft: 8,
  },
  text: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 8,
  },
  feature: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 6,
  },
  role: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 8,
    paddingLeft: 8,
  },
  tech: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 6,
  },
  step: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  version: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
