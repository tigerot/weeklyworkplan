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
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import apiCall from "../Apis/apiRequests";

const initialFieldValuesLateComes = {
  id: 0,
  lateComer: "",
  timeOfLateComer: "",
  date: "",
};

const LateComeForm = ({
  opened,
  onClose,
  editLateComeState,
  latecomes,
  loadLateComes,
}) => {

  const [formValues, setFormValues] = useState(initialFieldValuesLateComes);

  useEffect(() => {
    setFormValues({
      ...initialFieldValuesLateComes,
      ...editLateComeState,
      date: editLateComeState?.date ? new Date(editLateComeState.date) : null,
    });
  }, [editLateComeState?.id]);

  const setFormValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const prepareValues = (values) => {
    return {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DDThh:mm:ss"),
    };
  };

  async function saveLateCome(event) {
    event.preventDefault();
    try {
      if (formValues.id > 0) {
        await apiCall("updateLateCome")(formValues.id,prepareValues(formValues));
      } else {
        await apiCall("createLateCome")(prepareValues(formValues));
      }
      alert("Başarıyla Güncellendi");
      onClose();

      loadLateComes();
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
        title="Geç Gelenler"
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
                value={formValues.lateComer}
                withAsterisk
                onChange={(event) =>
                  setFormValue("lateComer", event.currentTarget.value)
                }
              />

              <TimeInput
                label="Saati:"
                withAsterisk
                value={formValues.timeOfLateComer}
                onChange={(event) =>
                  setFormValue("timeOfLateComer", event.currentTarget.value)
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
                <Button type="submit" onClick={saveLateCome}>
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

export default LateComeForm;
