import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import api from '../lib/api';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [cookTimeUnit, setCookTimeUnit] = useState('minutes');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !description || !cookTime) {
      Alert.alert('Validation', 'Please fill in all required fields');
      return;
    }

    const cookTimeNum = parseInt(cookTime);
    if (isNaN(cookTimeNum) || cookTimeNum < 1) {
      Alert.alert('Validation', 'Cook time must be a positive number');
      return;
    }

    setLoading(true);
    try {
      await api.post('/food-posts', {
        title,
        description,
        cookTime: cookTimeNum,
        cookTimeUnit,
        isPublic: false
      });
      
      Alert.alert('Success', 'Food post created successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (err: any) {
      console.error('Create post error:', err);
      Alert.alert('Error', err?.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Food Post</Text>
      
      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dish title"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />
      
      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your dish..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        maxLength={500}
      />
      
             <Text style={styles.label}>Cook Time *</Text>
       <TextInput
         style={styles.input}
         placeholder="30"
         value={cookTime}
         onChangeText={setCookTime}
         keyboardType="numeric"
       />
       
       <Text style={styles.label}>Time Unit</Text>
       <View style={styles.unitContainer}>
         <TouchableOpacity
           style={[
             styles.unitButton,
             cookTimeUnit === 'minutes' && styles.unitButtonActive
           ]}
           onPress={() => setCookTimeUnit('minutes')}
         >
           <Text style={[
             styles.unitButtonText,
             cookTimeUnit === 'minutes' && styles.unitButtonTextActive
           ]}>Minutes</Text>
         </TouchableOpacity>
         <TouchableOpacity
           style={[
             styles.unitButton,
             cookTimeUnit === 'hours' && styles.unitButtonActive
           ]}
           onPress={() => setCookTimeUnit('hours')}
         >
           <Text style={[
             styles.unitButtonText,
             cookTimeUnit === 'hours' && styles.unitButtonTextActive
           ]}>Hours</Text>
         </TouchableOpacity>
       </View>
      
      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <Button title="Create Post" onPress={handleSubmit} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  unitContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  unitButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  unitButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  unitButtonText: {
    fontSize: 16,
    color: '#666',
  },
  unitButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
}); 