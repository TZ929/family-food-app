import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../lib/api';
import { saveToken, deleteToken } from '../utils/auth';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Validation', 'Username and password are required');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/users/login', {
        username,
        password,
      });
      console.log('🔑 Login successful, token received');
      await saveToken(data.token);
      console.log('💾 Token saved to SecureStore');
      router.replace('/(tabs)');
    } catch (err: any) {
      console.error(err);
      Alert.alert('Login failed', err?.response?.data?.error ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <Text style={{ marginTop: 16 }} onPress={() => router.push('/register')}>
        Don't have an account? Register
      </Text>
      <Button 
        title="Clear Stored Token" 
        onPress={async () => {
          await deleteToken();
          Alert.alert('Token cleared', 'Please try logging in again');
        }}
        color="#ff8800"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
