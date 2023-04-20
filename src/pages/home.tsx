import { Button, Card, Col, Divider, Input, Row, Skeleton, Space } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import flaite from "../assets/chilean.png";
import marley from "../assets/bob-marley.png";
import homero from "../assets/homero.png";
import negative from "../assets/negative.png";
import positive from "../assets/positive.png";
import snoop from "../assets/snoop.png";

import { post } from "../http/http";
import { CharacterEnum } from "./interfaces/character.enum";
import { Message } from "./components/message";
const { TextArea } = Input;
export const Home = () => {
  const deafulCharacter = {
    character: CharacterEnum.chilean,
    index: 1
  }
  const inputRef = useRef<any>(null);
  const [textConversation, setTextConversation] = useState("");
  const [response, setResponse] = useState("");
  const [character, setCharacter] = useState(deafulCharacter.character);
  const [loanding, setLoanding] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [selected, setSelected] = useState(deafulCharacter.index);
  const [chatList, setChatList] = useState<any[]>([]);
  const sendConversation = async (conversation: any) => {
    setLoanding(true);
    setShowSkeleton(true);
    console.log(textConversation);
    const body = {
      character: character,
      chat: conversation,
    };
    const result: any = await post("conversation", body);
    try {
      const chatlistNew = chatList;
      const dialog = {
        role: 'assistant',
        content: result.data.payload.message.content,
      }
      chatlistNew.push(dialog)
      setChatList([...chatlistNew])
      // setShowSkeleton(false);
      setLoanding(false);
    } catch (error) {
      setLoanding(false);
      // setShowSkeleton(false);
    }
    console.log(result);
  };

  const addMessage = () => {
    const chatlistNew = chatList;
    const dialog = {
      role: 'user',
      content: textConversation,
    }
    chatlistNew.push(dialog)
    setChatList([...chatlistNew])
    setTextConversation('')
    sendConversation(chatList)

  }
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  }, [chatList])

  useEffect(() => {
    setChatList([])
  }, [character])
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      addMessage()
    }
  };
  const characterList = [
    {
      image:
        "https://image.lexica.art/full_jpg/707326c6-10b7-4528-8f61-b21654832268",
      character: CharacterEnum.philosofer,
      name: "Filosofo",
    },
    {
      image: flaite,
      character: CharacterEnum.chilean,
      name: "Chileno",
    },
    {
      image: snoop,
      character: CharacterEnum.snoop,
      name: "Snoop Dog",
    },
    // {
    //   image: marley,
    //   character: CharacterEnum.marley,
    //   name: "Bob Marley",
    // },
    {
      image: negative,
      character: CharacterEnum.negative,
      name: "negativa",
    },
    {
      image: positive,
      character: CharacterEnum.positive,
      name: "positiva",
    },
    {
      image: homero,
      character: CharacterEnum.homero,
      name: "Homero",
    },
  ];
  return (
    <>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      />
      <Divider orientation="left">Selecciona el Personaje</Divider>

      <Row justify="center" gutter={16}>
        <>
          {characterList.map((characterData, ind) => {
            return (
              <Col key={ind}>
                <Card
                key={ind}
                  bodyStyle={{
                    backgroundColor: ind === selected ? "#3460c0" : "",
                  }}
                  hoverable
                  style={{ width: 150 }}
                  cover={<img alt="example" src={characterData.image} />}
                  onClick={() => {
                    setCharacter(characterData.character), setSelected(ind);
                  }}
                >
                  <Meta title={characterData.name} />
                </Card>
              </Col>
            );
          })}
        </>
      </Row>

      <Divider orientation="left">Chat (MAX 50 Caracteres)</Divider>
      <div
        ref={inputRef}
        style={{ height: "400px", backgroundColor: "white", overflow: "auto" }}
      >
        { chatList.map((chat: any, key: number) => {
          return (<Message key={key} role={chat.role} msg={chat.content}></Message>);
        })}
        {/* <Message role="assistant"></Message>
          <Message role="user"></Message> */}
      </div>
      <Row>
        <Col flex={2}>
          <TextArea
            rows={4}
            placeholder="Ingresa un texto ejemplo : hola que tal"
            maxLength={50}
            onChange={(value: any) => setTextConversation(value.target.value)}
            onKeyDown={handleKeyDown}
            value= {textConversation}
          />
        </Col>
        <Col></Col>
      </Row>
      <Space direction="vertical" style={{ width: "100%", marginTop: "20px" }}>
        {loanding && (
          <div>Esperando respuesta...</div>
        )}
      </Space>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button type="primary" block onClick={() => addMessage()}>
          Enviar
        </Button>
      </Space>
      <Space direction="vertical" style={{ width: "100%", marginTop: '10px' }}>
        <Button danger type="primary" block onClick={() => setChatList([])}>
          Re iniciar conversacion
        </Button>
      </Space>
      
    </>
  );
};
