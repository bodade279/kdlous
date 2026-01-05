import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { theme } from '../theme';

export default function HomeScreen() {
  const { logout, user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user?.name || 'User'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || 'No Email'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 32, color: '#333' },
  card: { width: '100%', backgroundColor: '#fff', padding: 24, borderRadius: 16, elevation: 2, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  label: { fontSize: 14, color: 'gray', marginBottom: 4 },
  value: { fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#333' },
  button: { backgroundColor: '#ef4444', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 30, width: '100%' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }
});
