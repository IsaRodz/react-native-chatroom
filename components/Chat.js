import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase, { auth, firestore } from '../firebase';

import SignOut from './SignOut';

const Chat = () => {
  const messagesRef = firestore.collection('/messages');
  const query = messagesRef.orderBy('createdAt');
  const [messages] = useCollectionData(query, { idField: 'id' });

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Chatroom</Text>
        <SignOut />
      </View>
      <ScrollView>
        {messages &&
          messages.map(message => (
            <View key={message.id}>
              <Text>{message.text}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Chat;
