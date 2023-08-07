import { useDisclosure } from "@mantine/hooks";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  Stack,
  Group,
  Button,
  Container,
  Select,
  Modal,
} from "@mantine/core";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import apiCall from "../Apis/apiRequests";

const initialFieldValuesDefects = {
  id: 0,
  defectProduct: "",
  defectReason: "",
  defectLine: "",
  defectAmount: 0,
  defectStatus: "",
  date: "",
};

const ReturnForm = ({ opened, onClose, editDefectState, defects, loadReturnsFromQualityAssurance }) => {

  const [defectId, setDefectId] = useState(0);
  const [defectProduct, setDefectProduct] = useState("");
  const [defectReason, setDefectReason] = useState("");
  const [defectLine, setDefectLine] = useState("");
  const [defectAmount, setDefectAmount] = useState(0);
  const [defectStatus, setDefectStatus] = useState("");
  const [date, setDate] = useState(null);

  const [formValues, setFormValues] = useState(initialFieldValuesDefects);

  useEffect(() => {
    setFormValues({
      ...initialFieldValuesDefects,
      ...editDefectState,
      date: editDefectState?.date ? new Date(editDefectState.date) : null,
    });
  }, [editDefectState?.id]);

  const setFormValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const prepareValues = (values) => {
    return {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DDThh:mm:ss"),
    };
  };

  async function saveReturnsFromQualityAssurance(event) {
    event.preventDefault();
    try {
      if (formValues.id > 0) {
        await apiCall("updateReturnsFromQualityAssurance")(formValues.id,prepareValues(formValues));
      } else {
        await apiCall("createReturnsFromQualityAssurance")(prepareValues(formValues));
      }
      alert("Başarıyla Güncellendi");
      onClose();

      loadReturnsFromQualityAssurance();
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
        title="Kaliteden Dönen Ürün"
        centered
      >
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
                label="Dönen Ürün:"
                value={formValues.defectProduct}
                withAsterisk
                onChange={(event) =>
                  setFormValue("defectProduct", event.currentTarget.value)
                }
              />

              <TextInput
                label="Dönme Nedeni:"
                value={formValues.defectReason}
                withAsterisk
                onChange={(event) =>
                  setFormValue("defectReason", event.currentTarget.value)}
              />

              <TextInput
                label="Hattı:"
                value={formValues.defectLine}
                withAsterisk
                onChange={(event) =>
                  setFormValue("defectLine", event.currentTarget.value)}
              />

              <TextInput
                label="Adedi:"
                value={formValues.defectAmount}
                withAsterisk
                onChange={(event) =>
                  setFormValue("defectAmount", event.currentTarget.value)}
              />

              <Select
                label="Durumu:"
                value={formValues.defectStatus}
                withAsterisk
                data={["Kontrol Edildi", "Tamamlandı"]}
                onChange={(selected) =>
                  setFormValue("defectStatus", selected)}
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
                <Button type="submit" onClick={saveReturnsFromQualityAssurance}>
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



export default ReturnForm;
