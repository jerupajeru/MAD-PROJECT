import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseAuth';
import Shared from '../Shared/Shared';
import { useUser } from '../hooks/useUser';
import PetListItem from './PetListItem';

export default function Fevourite() {

  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetFavPetIds(user);
    }
  }, [user]);

  const GetFavPetIds = async (user) => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favourites);
    setLoader(false);
    GetFavPetList(result?.favourites);
  }

  const GetFavPetList = async (favIds) => {
    setLoader(true);
    setFavPetList([]);
    const q = query(collection(db, 'Pets'), where('id', 'in', favIds));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setFavPetList(prev => [...prev, doc.data()]);
    });
    setLoader(false);
  }

  return (
    <View style={{
      padding: 20,
      marginTop: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 30
      }}>Favourites</Text>

      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={() => GetFavPetIds(user)} // Pass user when refreshing
        refreshing={loader}
        renderItem={({ item }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </View>
  )
}
