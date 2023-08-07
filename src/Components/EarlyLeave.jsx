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
import EarlyLeaveForm from "./EarlyLeaveForm";
import EarlyLeaveTable from "./EarlyLeaveTable";
import CalendarSelection from "./CalendarSelection";
import { useDisclosure } from "@mantine/hooks";
import apiCall from "../Apis/apiRequests";


const EarlyLeave = () => {

  const [earlyleaves, setEarlyLeaves] = useState([]);

  const [editEarlyLeaveState, setEditEarlyLeaveState] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const onEarlyLeaveEdit = (data) => {
    setEditEarlyLeaveState(data);
    open();
  };

  useEffect(() => {
    (async () => await loadEarlyLeaves())();
  }, []);

  async function loadEarlyLeaves() {
    const result = await apiCall("fetchAllEarlyLeave")();
    setEarlyLeaves(result.data);
  }

  return (
    <div>
      <Group position="center" mt="xl">
        <Button color="green" onClick={open}>
          Erken Çıkan Kişi Oluştur
        </Button>
      </Group>
      <EarlyLeaveForm opened={opened} onClose={close} loadEarlyLeaves={loadEarlyLeaves} editEarlyLeaveState={editEarlyLeaveState} />
      <>
        <EarlyLeaveTable earlyleaves={earlyleaves} loadEarlyLeaves={loadEarlyLeaves} onEarlyLeaveEdit={onEarlyLeaveEdit} />
      </>
    </div>
  );
};



export default EarlyLeave;
