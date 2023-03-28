import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Skeleton,
  Space,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { motion } from "framer-motion";

import flaite from "../assets/chilean.png";
import marley from "../assets/bob-marley.png";
import homero from "../assets/homero.png";
import negative from "../assets/negative.png";
import positive from "../assets/positive.png";
import snoop from "../assets/snoop.png";


import { post } from "../http/http";
import { CharacterEnum } from "./interfaces/character.enum";
const { TextArea } = Input;
export const Home = () => {
  const [textConversation, setTextConversation] = useState("");
  const [response, setResponse] = useState("aqui");
  const [character, setCharacter] = useState("chilean");
  const [loanding, setLoanding] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [selected, setSelected] = useState(0);
  const getConversation = async () => {
    setLoanding(true);
    setShowSkeleton(true);
    console.log(textConversation);
    const body = {
      character: character,
      text: textConversation,
    };
    const result: any = await post("conversation", body);
    try {
      setResponse(result.data.payload.message.content);
      setShowSkeleton(false);
    } catch (error) {
      setLoanding(false);
      setShowSkeleton(false);
    }
    console.log(result);
  };

  const characterList = [
    {
      image:
        "https://image.lexica.art/full_jpg/707326c6-10b7-4528-8f61-b21654832268",
      character: CharacterEnum.philosofer,
      name: 'Folosofo'
    },
    {
      image: flaite,
      character: CharacterEnum.chilean,
      name: 'Chileno'
    },
    {
      image: snoop,
      character: CharacterEnum.snoop,
      name: 'Snoop Dog'
    },
    {
      image: marley,
      character: CharacterEnum.marley,
      name: 'Bob Marley'
    },
    {
      image: negative,
      character: CharacterEnum.negative,
      name: 'negativa'
    },
    {
      image: positive,
      character: CharacterEnum.positive,
      name: 'positiva'
    },
    {
      image: homero,
      character: CharacterEnum.homero,
      name: 'Homero'
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
              <Col>
                <Card
                  bodyStyle={{backgroundColor: ind === selected ? '#3460c0': ''}}
                  hoverable
                  style={{ width: 150 }}
                  cover={<img alt="example" src={characterData.image} />}
                  onClick={() => {setCharacter(characterData.character), setSelected(ind)}}
                >
                  <Meta title={characterData.name} />
                </Card>
              </Col>
            );
          })}
        </>
      </Row>

      <Divider orientation="left">Ingresa un Texto</Divider>
      <Row>
        <Col flex={2}>
          <TextArea
            rows={4}
            placeholder="Ingresa un texto ejemplo :Que es el amor? "
            maxLength={50}
            onChange={(value: any) => setTextConversation(value.target.value)}
          />
        </Col>
        <Col></Col>
      </Row>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button type="primary" block onClick={() => getConversation()}>
          Enviar
        </Button>
      </Space>

      <Space direction="vertical" style={{ width: "100%", marginTop: '20px' }}>
        {loanding && (
          <Space direction="vertical" style={{ width: "100%" }} size={16}>
            <Skeleton active={true} loading={showSkeleton}>
              {response}
            </Skeleton>
          </Space>
        )}
      </Space>
    </>
  );
};
