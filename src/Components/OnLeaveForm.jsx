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
  Modal,
} from "@mantine/core";
import axios from "axios";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import apiCall from "../Apis/apiRequests";

const initialFieldValuesOnLeaves = {
  id: 0,
  onLeave: "",
  durationOfOnLeave: "",
  date: ""
};

const OnLeaveForm = ({ opened, onClose, editOnLeaveState, onleaves, loadOnLeaves }) => {

  const [onLeaveId, setOnLeaveId] = useState("");
  const [onLeave, setOnLeave] = useState("");
  const [durationOfOnLeave, setDurationOfOnLeave] = useState("");
  const [date, setDate] = useState(null);

  const [formValues, setFormValues] = useState(initialFieldValuesOnLeaves);

  useEffect(() => {
    setFormValues({
      ...initialFieldValuesOnLeaves,
      ...editOnLeaveState,
      date: editOnLeaveState?.date ? new Date(editOnLeaveState.date) : null,
    });
  }, [editOnLeaveState?.id]);

  const setFormValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const prepareValues = (values) => {
    return {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DDThh:mm:ss"),
    };
  };

  async function saveOnLeave(event) {
    event.preventDefault();
    try {
      if (formValues.id > 0) {
        await apiCall("updateOnLeave")(formValues.id,prepareValues(formValues));
      } else {
        await apiCall("createOnLeave")(prepareValues(formValues));
      }
      alert("Başarıyla Güncellendi");
      onClose();

      loadOnLeaves();
    } catch (error) {
      alert(error);
    }
  }
  

  return (
    <>
      <Modal fullScreen opened={opened}
        onClose={onClose} title="İzindeki Kişi" centered>
        {
          <Container>
            <form autoComplete="off" noValidate >
            <TextInput
                type="hidden"
                value={formValues.id}
                withAsterisk
                onChange={(event) =>
                  setFormValue("id", event.currentTarget.value)
                }
              />
              <TextInput
                label="Kişi:"
                value={formValues.onLeave}
                withAsterisk
                onChange={(event) => setFormValue("onLeave", event.currentTarget.value)}
              />

              <TextInput
                label="Gün Sayısı:"
                value={formValues.durationOfOnLeave}
                withAsterisk
                onChange={(event) =>
                  setFormValue("durationOfOnLeave", event.currentTarget.value)
                }
              />

              <DateInput
                valueFormat="DD.MM.YYYY"
                label="Tarih:"
                placeholder="Tarih..."
                maw={1000}
                mx="auto"
                withAsterisk
                value={formValues.date}
                locale="tr"
                onChange={(d) => setFormValue("date", d)}
              />

              <Group position="center" mt="xl">
                <Button type="submit" onClick={saveOnLeave}>
                  ekle
                </Button>
              </Group>
            </form>
          </Container>
        }
      </Modal>
    </>
  );
};



export default OnLeaveForm;
