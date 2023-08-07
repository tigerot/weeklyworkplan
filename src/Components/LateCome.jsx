import React, { useState, useEffect } from "react";
import {
  Grid,
  TextInput,
  Stack,
  Group,
  Text,
  Button,
  Container,
  Select,
} from "@mantine/core";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { DateInput } from "@mantine/dates";
import LateComeForm from "./LateComeForm";
import LateComeTable from "./LateComeTable";
import CalendarSelection from "./CalendarSelection";
import { useDisclosure } from "@mantine/hooks";
import apiCall from "../Apis/apiRequests";

const initialFieldValuesLateComes = {
  LateComer: "",
  TimeOfLateComer: ""
};

const LateCome = () => {

  const [latecomes, setLateComes] = useState([]);

  const [editLateComeState, setEditLateComeState] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const onLateComeEdit = (data) => {
    setEditLateComeState(data);
    open();
  };

  useEffect(() => {
    (async () => await loadLateComes())();
  }, []);

  async function loadLateComes() {
    const result = await apiCall("fetchAllLateCome")();
    setLateComes(result.data);
  }

  return (
    <div>
      <Group position="center" mt="xl">
        <Button color="green" onClick={open}>
          Geç Kalan Kişi Oluştur
        </Button>
      </Group>
      <LateComeForm opened={opened} onClose={close} loadLateComes={loadLateComes} editLateComeState={editLateComeState} />
      <>
        <LateComeTable latecomes={latecomes} loadLateComes={loadLateComes} onLateComeEdit={onLateComeEdit} />
      </>
    </div>
  );
};



export default LateCome;