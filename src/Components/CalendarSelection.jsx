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
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import dayjs from "dayjs";

const initialFieldValuesProducts = {
  Id: 0,
  Date: "",
  ProductName: "",
  Line: "",
  ProductAmount: 0,
  ProductStatus: null,
};

const initialFieldValuesAbsents = {
  Absentee: "",
  ReasonOfAbsentee: ""
};

const initialFieldValuesEarlyLeaves = {
  LateComer: "",
  TimeOfLateComer: "",
};

const initialFieldValuesLateComes = {
  LateComer: "",
  TimeOfLateComer: ""
};

const initialFieldValuesDefects = {
  DefectProduct: "",
  DefectReason: "",
  DefectLine: "",
  DefectAmount: 0,
  DefectStatus: "",
};



const CalendarSelection = ({ classes, onChange, selectedDate, ...props }) => {
  const [productId, setProductId] = useState(0);
  const [date, setDate] = useState(null);
  //const [dayOfWeek, setDayOfWeek] = useState(null);
  const [productName, setProductName] = useState("");
  const [line, setLine] = useState("");
  const [productAmount, setProductAmount] = useState(0);
  const [productStatus, setProductStatus] = useState("");

  const [workplans, setWorkPlans] = useState([]);

  const [valuesProducts, setValuesProducts] = useState(
    initialFieldValuesProducts
  );

  const [valuesAbsents, setValuesAbsents] = useState(initialFieldValuesAbsents);

  const [valuesLateComes, setValuesLateComes] = useState(initialFieldValuesLateComes);

  useEffect(() => {
    loadWorkPlan();
  }, []);

  async function loadWorkPlan() {
    const result = await axios.get("http://localhost:5271/api/WorkPlan/getall");
    setWorkPlans(result.data);
  }

  let dayArray = [dayjs().startOf("week")];
  for (let increment = 1; increment < 7; increment++) {
    dayArray.push(dayArray[0].add(increment, "day"));
  }
  
  async function editWorkPlan(workplans) {
    setDate(workplans.Date);
    //setDayOfWeek(workplans.DayOfWeek);
    setProductName(workplans.ProductName);
    setLine(workplans.Line);
    setProductAmount(workplans.ProductAmount);
    setProductStatus(workplans.ProductStatus);

  }

  async function updateWorkPlan(event) {
    event.preventDefault();
    editWorkPlan(workplans);
    try {
      await axios.put("http://localhost:5271/api/WorkPlan/update", {
        Id: productId,
        date: date,
        //DayOfWeek: dayOfWeek,
        productName: productName,
        line: line,
        productAmount: productAmount,
        productStatus: productStatus,
      });
      alert("Başarıyla Güncellendi");
      setDate("");
      //setDayOfWeek("");
      setProductName("");
      setLine("");
      setProductAmount(0);
      setProductStatus(null);

      loadWorkPlan();
    } catch (error) {
      alert(error);
    }
  }

  /*const handleUpdateCalendar = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      resetFormProducts();
      addToast("Başarıyla Eklendi", { appearance: "success" });
    };
    props.updateWorkPlan(props.Id, valuesProducts, onSuccess);
    props.updateAbsent(props.Id, valuesAbsents, onSuccess);
    props.updateLateCome(props.Id, valuesLateComes, onSuccess);
    props.updateEarlyLeave(props.Id, valuesEarlyLeave, onSuccess);
    props.updateOnLeave(props.Id, valuesProducts, onSuccess);
  };*/

  return (
    <form autoComplete="off" noValidate >
      <DateInput
        valueFormat="DD-MM-YYYY"
        label="Tarih Seçin:"
        placeholder="Tarih..."
        value={selectedDate}
        onChange={onChange}
        locale="tr"
        mx="auto"
        maw={400}
      />
    </form>
  );
};



export default CalendarSelection;
