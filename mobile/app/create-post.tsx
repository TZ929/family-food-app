import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import api from '../lib/api';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [cookTimeUnit, setCookTimeUnit] = useState('minutes');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to select images.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const takePhoto = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

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
      // Create form data for multipart upload
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('cookTime', cookTimeNum.toString());
      formData.append('cookTimeUnit', cookTimeUnit);
      formData.append('isPublic', 'false');

      // Add image if selected
      if (image) {
        const imageFile = {
          uri: image.uri,
          type: 'image/jpeg',
          name: 'food-image.jpg'
        };
        formData.append('image', imageFile);
      }

      await api.post('/food-posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
      
      {/* Image Section */}
      <Text style={styles.label}>Food Photo (Optional)</Text>
      <View style={styles.imageSection}>
        {image ? (
          <View style={styles.imagePreview}>
            <Image source={{ uri: image.uri }} style={styles.previewImage} />
            <TouchableOpacity 
              style={styles.removeImageButton}
              onPress={() => setImage(null)}
            >
              <Text style={styles.removeImageText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imageButtons}>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <Text style={styles.imageButtonText}>📷 Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>🖼️ Choose Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
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
  imageSection: {
    marginBottom: 16,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  imageButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  imagePreview: {
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  removeImageButton: {
    padding: 8,
    backgroundColor: '#ff4444',
    borderRadius: 6,
  },
  removeImageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
}); 