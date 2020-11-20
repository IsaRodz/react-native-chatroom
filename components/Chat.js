import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Feather } from "@expo/vector-icons";

import firebase, { auth, firestore } from "../firebase";

import SignOut from "./SignOut";
import { Avatar } from "react-native-elements";
import styled from "styled-components";

const Chat = () => {
  const messagesRef = firestore.collection("/messages");
  const query = messagesRef.orderBy("createdAt");
  const [messages] = useCollectionData(query, { idField: "id" });

  const [text, setText] = useState("");

  const handlePress = async () => {
    if (text && text.trim().length) {
      await messagesRef.add({
        text: text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      });
      setText("");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          backgroundColor: "#f4f4f4",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "space-between",
        }}
      >
        <Text style={{ fontSize: 28 }}>Chatroom</Text>
        <SignOut />
      </View>
      <ScrollView style={{ flex: 1, padding: 10, paddingBottom: 20 }}>
        {messages &&
          messages.map((message) => (
            <MessageContainer
              key={message.id}
              sent={message.uid === auth.currentUser.uid}
            >
              <Avatar
                size="medium"
                source={{ uri: message.photoURL }}
                rounded
              />
              <Message sent={message.uid === auth.currentUser.uid}>
                {message.text}
              </Message>
            </MessageContainer>
          ))}
      </ScrollView>
      <View
        style={{
          borderRadius: 25,
          backgroundColor: "#f4f4f4",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          value={text}
          onChangeText={(value) => setText(value)}
          placeholder="Type a message..."
          style={{ padding: 10, paddingLeft: 20, flex: 1 }}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#2196F3",
            borderWidth: 1,
            borderStyle: "solid",
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
          onPress={() => handlePress()}
        >
          <Feather name="send" size={16} color="#2196F3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MessageContainer = styled.View`
  margin-bottom: 14px;
  flex-direction: ${(props) => {
    if (props.sent === true) {
      return "row-reverse";
    } else {
      return "row";
    }
  }};
`;

const Message = styled(Text)`
  align-self: flex-start;
  padding: 10px 18px;
  line-height: 18px;
  border-radius: 24px;
  background-color: #2196f3;
  color: #fff;
  max-width: ${Dimensions.get("window").width - 100};
  ${(props) => {
    if (props.sent === true) {
      return "margin-right: 5px";
    } else {
      return "margin-left: 5px";
    }
  }};
`;

export default Chat;
