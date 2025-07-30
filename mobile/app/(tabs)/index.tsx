import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../lib/api';
import { deleteToken } from '../../utils/auth';

interface User {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      console.log('🔄 Fetching profile...');
      const { data } = await api.get('/users/profile');
      console.log('✅ Profile data received:', data);
      setUser(data);
    } catch (err: any) {
      console.error('❌ Profile fetch failed:', err);
      console.error('📄 Response data:', err.response?.data);
      console.error('📊 Status:', err.response?.status);
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await deleteToken();
      router.replace('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Failed to load profile</Text>
        <Button title="Retry" onPress={fetchProfile} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{user.username}</Text>
        
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{user._id}</Text>
        
        <Text style={styles.label}>Member since:</Text>
        <Text style={styles.value}>
          {new Date(user.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.actionsSection}>
        <Button title="Logout" onPress={handleLogout} color="#ff4444" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  profileSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  actionsSection: {
    marginTop: 20,
  },
});
