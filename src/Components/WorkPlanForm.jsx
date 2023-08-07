import { useDisclosure } from "@mantine/hooks";
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
  Table,
  Modal
} from "@mantine/core";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import apiCall from "../Apis/apiRequests";

const initialFieldValuesProducts = {
    id: 0,
    date: "",
    productName: "",
    line: "",
    productAmount: 0,
    productStatus: "",
  };

const WorkPlanForm = ({ opened, onClose, editWorkPlanState, loadWorkPlan }) => {

  //const [dayOfWeek, setDayOfWeek] = useState(null);

  const [formValues, setFormValues] = useState(initialFieldValuesProducts);

  useEffect(() => {
    setFormValues({
      ...initialFieldValuesProducts,
      ...editWorkPlanState,
      date: editWorkPlanState?.date ? new Date(editWorkPlanState.date) : null
    });
  }, [editWorkPlanState?.id]);

  const setFormValue = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const prepareValues = (values) => {
    return {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DDThh:mm:ss"),
    };
  };

  async function saveWorkPlan(event) {
    event.preventDefault();
    try {
      if (formValues.id > 0) {
        await apiCall("updateWorkPlan")(formValues.id,prepareValues(formValues));
      } else {
        await apiCall("createWorkPlan")(prepareValues(formValues));
        
      }
      alert("Başarıyla Güncellendi");
      onClose();

      loadWorkPlan();
    } catch (error) {
      alert(error);
    }
  }

  /*let workPlanDateArray = [];
  for (const singleValue of Object.keys(props.WeeklyWorkPlan)) {
    const singleWorkPlan = props.WeeklyWorkPlan[singleValue];
    if (!workPlanDateArray.includes(singleWorkPlan.onlyDate)) {
      workPlanDateArray.push(singleWorkPlan.onlyDate);
    }
  }*/

  let dayArray = [dayjs().startOf("week")];
  for (let increment = 1; increment < 7; increment++) {
    dayArray.push(dayArray[0].add(increment, "day"));
  }

  

  return (
    <>
      <Modal fullScreen opened={opened}
        onClose={onClose} title="İş Planı" centered>
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
                label="Ürün Adı:"
                value={formValues.productName}
                withAsterisk
                onChange={(event) =>
                  setFormValue("productName", event.currentTarget.value)}
              />

              <TextInput
                label="Hattı:"
                value={formValues.line}
                withAsterisk
                onChange={(event) =>
                  setFormValue("line", event.currentTarget.value)}
              />

              <TextInput
                label="Miktarı:"
                value={formValues.productAmount}
                withAsterisk
                onChange={(event) =>
                  setFormValue("productAmount", event.currentTarget.value)
                }
              />

              <Select
                label="Durumu:"
                value={formValues.productStatus}
                withAsterisk
                data={["Başlandı", "İptal", "Başlanmadı", "Tamamlandı"]}
                onChange={(selected) =>
                  setFormValue("productStatus", selected)}
              />

              <DateInput
                valueFormat="DD.MM.YYYY"
                label="Tarih:"
                placeholder="Tarih..."
                maw={1000}
                mx="auto"
                value={formValues.date}
                withAsterisk
                locale="tr"
                onChange={(d) => setFormValue("date", d)}
              />

              <Group position="center" mt="xl">
                <Button type="submit" onClick={saveWorkPlan}>
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


  
  export default WorkPlanForm;