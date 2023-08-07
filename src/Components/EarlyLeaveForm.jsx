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
import { DateInput, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import apiCall from "../Apis/apiRequests";

const initialFieldValuesEarlyLeaves = {
  id: 0,
  earlyLeave: "",
  timeOfEarlyLeave: "",
  date: ""
};

const EarlyLeaveForm = ({
  opened,
  onClose,
  editEarlyLeaveState,
  loadEarlyLeaves,
}) => {

  const [formValues, setFormValues] = useState(initialFieldValuesEarlyLeaves);

  useEffect(() => {
    setFormValues({
      ...initialFieldValuesEarlyLeaves,
      ...editEarlyLeaveState,
      date: editEarlyLeaveState?.date ? new Date(editEarlyLeaveState.date) : null
    });
  }, [editEarlyLeaveState?.id]);

  const setFormValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const prepareValues = (values) => {
    return {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DDThh:mm:ss"),
    };
  };

  async function saveEarlyLeave(event) {
    event.preventDefault();
    try {
      if (formValues.id > 0) {
        await apiCall("updateEarlyLeave")(formValues.id,prepareValues(formValues));
      } else {
        await apiCall("createEarlyLeave")(prepareValues(formValues));
      }
      alert("Başarıyla Güncellendi");
      onClose();

      loadEarlyLeaves();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Modal
        fullScreen
        opened={opened}
        onClose={onClose}
        title="Erken Çıkanlar"
        centered
      >
        {
          <Container>
            <form autoComplete="off" noValidate>
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
                value={formValues.earlyLeave}
                withAsterisk
                onChange={(event) =>
                  setFormValue("earlyLeave", event.currentTarget.value)}
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

              <TimeInput
                label="Saati:"
                withAsterisk
                value={formValues.timeOfEarlyLeave}
                onChange={(event) =>
                  setFormValue("timeOfEarlyLeave", event.currentTarget.value)
                }
              />

              <Group position="center" mt="xl">
                <Button type="submit" onClick={saveEarlyLeave}>
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

export default EarlyLeaveForm;
