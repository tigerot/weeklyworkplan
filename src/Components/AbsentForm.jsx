import React, { useState, useEffect } from "react";
import {
  TextInput,
  Group,
  Button,
  Container,
  Modal,
} from "@mantine/core";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { DateInput, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import apiCall from "../Apis/apiRequests";

const initialFieldValuesAbsents = {
  id: 0,
  absentee: "",
  reasonOfAbsentee: "",
  timeOfAbsentee: "",
  date: "",
};

const AbsentForm = ({ opened, onClose, editAbsentState, loadAbsents }) => {
  
  const [formValues, setFormValues] = useState(initialFieldValuesAbsents);

  useEffect(() => {
    setFormValues({
      ...initialFieldValuesAbsents,
      ...editAbsentState,
      date: editAbsentState?.date ? new Date(editAbsentState.date) : null
    });
  }, [editAbsentState?.id]);

  const setFormValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const prepareValues = (values) => {
    return {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DDThh:mm:ss"),
    };
  };

  async function saveAbsents(event) {
    event.preventDefault();
    try {
      if (formValues.id > 0) {
        await apiCall("updateAbsent")(formValues.id,prepareValues(formValues));
      } else {
        await apiCall("createAbsent")(prepareValues(formValues));
      }
      alert("Başarıyla Güncellendi");
      onClose();

      loadAbsents();
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
        title="Gelmeyenler"
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
                value={formValues.absentee}
                withAsterisk
                onChange={(event) =>
                  setFormValue("absentee", event.currentTarget.value)
                }
              />

              <TextInput
                label="Nedeni:"
                value={formValues.reasonOfAbsentee}
                withAsterisk
                onChange={(event) =>
                  setFormValue("reasonOfAbsentee", event.currentTarget.value)
                }
              />

              <DateInput
                valueFormat="DD.MM.YYYY"
                label="Tarihi:"
                placeholder="Tarih..."
                maw={1000}
                mx="auto"
                value={formValues.date}
                locale="tr"
                onChange={(d) => setFormValue("date", d)}
                withAsterisk
              />

              <TimeInput
                label="Saati:"
                value={formValues.timeOfAbsentee}
                withAsterisk
                onChange={(event) =>
                  setFormValue("timeOfAbsentee", event.currentTarget.value)
                }
              />

              <Group position="center" mt="xl">
                <Button type="submit" onClick={saveAbsents}>
                  Kaydet
                </Button>
              </Group>
            </form>
          </Container>
        }
      </Modal>
    </>
  );
};

export default AbsentForm;
