import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!password) {
      setPasswordError('Please enter your password');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email.trim(), password);
      if (!res || !res.success) {
        setError(res && res.error ? res.error : 'Login failed');
      }
      // If login succeeds, AuthContext sets user and navigation will update automatically
    } catch (e) {
      setError(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

 
  const isFormValid = !!validateEmail(email) && password.length >= 6;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={[styles.input, emailError ? styles.inputInvalid : null]}
          value={email}
          onChangeText={(text) => { setEmail(text); setEmailError(''); setError(''); }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.inputError}>{emailError}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={[styles.input, passwordError ? styles.inputInvalid : null]}
          value={password}
          onChangeText={(text) => { setPassword(text); setPasswordError(''); setError(''); }}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
        {passwordError ? <Text style={styles.inputError}>{passwordError}</Text> : null}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => handleSignupPress()}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8, color: theme.colors.primary },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 32 },
  inputContainer: { marginBottom: 16, position: 'relative' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 16, fontSize: 16, backgroundColor: '#f9f9f9' },
  eyeIcon: { position: 'absolute', right: 16, top: 16 },
  button: { backgroundColor: theme.colors.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  error: { color: 'red', marginBottom: 16, backgroundColor: '#ffebee', padding: 10, borderRadius: 8 },
  inputInvalid: { borderColor: 'red' },
  inputError: { color: 'red', marginTop: 6 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { color: 'gray', fontSize: 16 },
  link: { color: theme.colors.primary, fontSize: 16, fontWeight: 'bold' }
});
