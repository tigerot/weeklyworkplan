import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  TextInput,
  Stack,
  Group,
  Text,
  Button,
  Container,
  Select,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AbsentForm from "./AbsentForm";
import AbsentTable from "./AbsentTable";
import apiCall from "../Apis/apiRequests";



const Absent = () => {

  const [absents, setAbsents] = useState([]);

  const [editAbsentState, setEditAbsentState] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const onAbsentEdit = (data) => {
    setEditAbsentState(data);
    open();
  };

  useEffect(() => {
    (async () => await loadAbsents())();
  }, []);

  async function loadAbsents() {
    const result = await apiCall("fetchAllAbsent")();
    setAbsents(result.data);
  }
  

  return (
    <div>
      <Group position="center" mt="xl">
        <Button color="green" onClick={open}>
          Gelmeyen Kişi Oluştur
        </Button>
      </Group>
      <AbsentForm opened={opened} onClose={close} loadAbsents={loadAbsents} editAbsentState={editAbsentState} />
      <>
        <AbsentTable absents={absents} loadAbsents={loadAbsents} onAbsentEdit={onAbsentEdit} />
      </>
    </div>
  );
};



export default Absent;
