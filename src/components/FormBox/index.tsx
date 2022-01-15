import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import { collection, addDoc, getFirestore, getDocs, query, getDoc } from 'firebase/firestore';
import { Container } from './styles';
import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Input';
import { Alert, Platform } from 'react-native';
import { initializeApp } from 'firebase/app';

export function FormBox() {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(0)

  async function hadleProductAdd() {
    if (Platform.OS !== 'web') {
      const result = await firestore().collection('products').get()
      console.log(result);
      /* .add({
        description,
        quantity,
        done: false
      }).then(() => {
        Alert.alert('produto adicionado com sucesso')
      }).catch(() => {
        Alert.alert('erro ao inserir')
      }) */
    } else {
      const firebaseConfig = {
        apiKey: "AIzaSyAA_ET6Oh1ZBrMcJMAms1jh2BoV85i1MFE",
        authDomain: "myshopping-7972a.firebaseapp.com",
        projectId: "myshopping-7972a",
        storageBucket: "myshopping-7972a.appspot.com",
        messagingSenderId: "331808607336",
        appId: "1:331808607336:web:831822dd5c6f5b2da0ffdd",
        measurementId: "G-94EFGC1J25"
      };
      const App = initializeApp(firebaseConfig);

      const db = await getFirestore(App)
      addDoc(collection(db, 'products'), {
        description,
        quantity,
        done: false
      })
    }
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={value => setQuantity(Number(value))}
      />

      <ButtonIcon
        size='large'
        icon="add-shopping-cart"
        onPress={hadleProductAdd}
      />
    </Container>
  );
}
