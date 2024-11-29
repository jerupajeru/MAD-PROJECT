import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useUser } from '../hooks/useUser';  // Assuming you have a useUser hook
import { getDocs, query, where, collection, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseAuth';  // Firebase Firestore import
import PetListItem from './PetListItem';

const MyPost = () => {
  const { user } = useUser();  // Fetch user data
  const [userPostList, setUserPostList] = useState([]);
  const [loading, setLoading] = useState(false);  // Loading state
  const [isUpdating, setIsUpdating] = useState(false);  // For toggling update form
  const [updatedPet, setUpdatedPet] = useState(null);  // Store pet data to update

  useEffect(() => {
    if (user) {
      getUserPosts();  // Fetch posts when user is available
    }
  }, [user]);

  // Fetch user posts from Firebase
  const getUserPosts = async () => {
    if (user?.email) {
      setLoading(true);
      try {
        const q = query(collection(db, 'Pets'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        setUserPostList(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Delete a specific post
  const handleDeletePost = async (postId) => {
    try {
      // Query Firestore for the pet with the matching custom id
      const q = query(collection(db, 'Pets'), where('id', '==', postId)); // Assuming 'id' is a field in the document
      const querySnapshot = await getDocs(q);
      
      // Check if a matching post exists
      if (querySnapshot.empty) {
        alert('Error', 'No post found with this ID');
        return;
      }
  
      // Get the document reference
      querySnapshot.forEach(async (docSnapshot) => {
        const petRef = doc(db, 'Pets', docSnapshot.id); // Firestore document ID is used here
        await deleteDoc(petRef); // Delete the document
      });
  
      // Remove the deleted post from the local state
      setUserPostList(userPostList.filter((post) => post.id !== postId)); // Filter out the deleted post from the UI
  
      alert('Success', 'Post deleted successfully');
    } catch (error) {
      console.error("Error deleting post:", error);
      alert('Error', 'Could not delete post');
    }
  };
  
  // Handle update functionality
 // Handle update functionality
// Handle update functionality
const handleUpdatePost = async () => {
  if (!updatedPet || !updatedPet.name) {
    Alert.alert('Error', 'No pet name provided to update.');
    return;
  }

  try {
    // Query Firestore for the pet with the matching name
    const q = query(collection(db, 'Pets'), where('name', '==', updatedPet.name));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      Alert.alert('Error', 'No pet found with the given name.');
      return;
    }

    // Update all matching documents
    querySnapshot.forEach(async (docSnapshot) => {
      const petRef = doc(db, 'Pets', docSnapshot.id);

      await updateDoc(petRef, updatedPet);
      console.log('Updated document:', docSnapshot.id);
    });

    // Update the state with new data
    setUserPostList(userPostList.map((post) =>
      post.name === updatedPet.name ? { ...post, ...updatedPet } : post
    ));

    Alert.alert('Success', 'Pet updated successfully');
    setIsUpdating(false);
  } catch (error) {
    console.error('Error updating post:', error);
    Alert.alert('Error', `Could not update post: ${error.message}`);
  }
};



const handleEdit = (pet) => {
  console.log("Pet Data for Editing:", pet); // Debug log
  setUpdatedPet({ ...pet }); 
  setIsUpdating(true);
};


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>User Posts</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={userPostList}
          numColumns={2}
          refreshing={loading}
          onRefresh={getUserPosts}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <PetListItem pet={item} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePost(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleEdit(item)}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {isUpdating && updatedPet && (
        <View style={styles.updateForm}>
          <Text style={styles.updateHeader}>Update Pet Info</Text>

          {/* Input fields for each pet detail */}
          <TextInput
            style={styles.input}
            value={updatedPet.name}
            onChangeText={(text) => setUpdatedPet({ ...updatedPet, name: text })}
            placeholder="Pet Name"
          />
          <TextInput
            style={styles.input}
            value={updatedPet.breed}
            onChangeText={(text) => setUpdatedPet({ ...updatedPet, breed: text })}
            placeholder="Breed"
          />
          <TextInput
            style={styles.input}
            value={updatedPet.age}
            onChangeText={(text) => setUpdatedPet({ ...updatedPet, age: text })}
            placeholder="Age"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={updatedPet.category}
            onChangeText={(text) => setUpdatedPet({ ...updatedPet, category: text })}
            placeholder="Category (e.g., Bird, Dog)"
          />
          <TextInput
            style={styles.input}
            value={updatedPet.sex}
            onChangeText={(text) => setUpdatedPet({ ...updatedPet, sex: text })}
            placeholder="Sex (Male/Female)"
          />
          <TextInput
            style={styles.input}
            value={updatedPet.about}
            onChangeText={(text) => setUpdatedPet({ ...updatedPet, about: text })}
            placeholder="About (Description)"
            multiline
          />
          <TextInput
            style={styles.input}
            value={updatedPet.imageUrl}
            onChangeText={(text) => setUpdatedPet({ ...updatedPet, imageUrl: text })}
            placeholder="Image URL"
          />

          {/* Button to save updated information */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleUpdatePost}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'outfit-medium',
    marginBottom: 20,
  },
  postItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  updateButton: {
    marginTop: 10,
    backgroundColor: '#ff9800',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  updateForm: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  updateHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyPost;
