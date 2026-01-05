import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
    const { signup } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSignup = async () => {
        setError('');
        setNameError('');
        setEmailError('');
        setPasswordError('');

     
        if (!name.trim()) {
            setNameError('Please enter your name');
            return;
        }
       
        if (!email.trim()) {
            setEmailError('Please enter your email');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            return;
        }
        // Validation: Password length less than 6
        if (!password) {
            setPasswordError('Please enter a password');
            return;
        }
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        const result = await signup(name, email, password);
        setLoading(false);

        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Full Name"
                    style={[styles.input, nameError ? styles.inputInvalid : null]}
                    value={name}
                    onChangeText={(text) => { setName(text); setNameError(''); setError(''); }}
                    autoCapitalize="words"
                />
                {nameError ? <Text style={styles.inputError}>{nameError}</Text> : null}
            </View>

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
                onPress={handleSignup}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.btnText}>Sign Up</Text>
                )}
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Login</Text>
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
