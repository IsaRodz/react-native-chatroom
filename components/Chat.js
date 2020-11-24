import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Keyboard, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import firebase, { auth, firestore } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import SignOut from "./SignOut";
import { Avatar } from "react-native-elements";
import styled from "styled-components/native";

const Chat = () => {
  const scrollView = useRef();
  useEffect(() => {
    scrollView.current.scrollToEnd({ animated: true });
  }, []);

  const handleSizeChange = () => {
    scrollView.current.scrollToEnd({ animated: true });
  };

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

      Keyboard.dismiss();
    }
  };

  return (
    <Container>
      <Header>
        <Title>Chatroom</Title>
        <SignOut />
      </Header>
      <ChatContainer ref={scrollView} onContentSizeChange={handleSizeChange}>
        {messages &&
          messages.map((message) => (
            <MessageContainer
              key={message.id}
              sent={message.uid === auth.currentUser.uid}
            >
              <Avatar source={{ uri: message.photoURL }} rounded />
              <Message sent={message.uid === auth.currentUser.uid}>
                {message.text}
              </Message>
            </MessageContainer>
          ))}
      </ChatContainer>
      <InputContainer>
        <Input
          value={text}
          onChangeText={(value) => setText(value)}
          placeholder="Type a message..."
        />
        <SendButton onPress={handlePress}>
          <Feather name="send" size={16} color="#fff" />
        </SendButton>
      </InputContainer>
    </Container>
  );
};

const Container = styled.View`
  padding-top: 20px;
  flex: 1;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const Header = styled.View`
  padding: 10px;
  background: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ChatContainer = styled.ScrollView`
  flex: 1;
  padding: 10px;
  padding-bottom: 20px;
`;
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
  background-color: ${(props) => (props.sent ? "#f1f1f1" : "#2196f3")};
  color: ${(props) => (props.sent ? "#000" : "#fff")};
  max-width: ${Dimensions.get("window").width - 100}px;
  ${(props) => {
    if (props.sent === true) {
      return "margin-right: 5px";
    } else {
      return "margin-left: 5px";
    }
  }};
`;

const InputContainer = styled.View`
  flex-direction: row;
  padding: 5px;
`;

const Input = styled.TextInput`
  background-color: #efefef;
  border-radius: 25px;
  padding: 10px 20px;
  margin-right: 4px;
  flex: 1;
`;

const SendButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #2196f3;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export default Chat;
