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
import dayjs from "dayjs";
import CalendarSelection from "./CalendarSelection";
import axios from "axios";
import apiCall from "../Apis/apiRequests";

const AbsentTable = ({ absents, onAbsentEdit, loadAbsents }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  let dayArray = [dayjs(selectedDate).startOf("week")];
  for (let increment = 1; increment < 7; increment++) {
    dayArray.push(dayArray[0].add(increment, "day"));
  }

  async function deleteAbsent(id) {
    await apiCall("deleteAbsent")(id);
    alert("Başarıyla Silindi");

    loadAbsents();
  }

  return (
    <>
      <div>
        <CalendarSelection
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
        <>
          <Table mt="md" striped withBorder withColumnBorders>
            <thead>
              <tr>
                <th scope="col">Kişi</th>
                <th scope="col">Nedeni</th>
                <th scope="col">Tarihi</th>
                <th scope="col">Saati</th>
              </tr>
            </thead>
            <tbody>
              {absents
                .filter(
                  (item) =>
                    item.onlyDate === dayjs(selectedDate).format("DD-MM-YYYY")
                )
                .map((newItem, index2) => (
                  <tr key={newItem.id}>
                    <td scope="row">{newItem.absentee}</td>
                    <td scope="row">{newItem.reasonOfAbsentee}</td>
                    <td scope="row">{newItem.onlyDate}</td>
                    <td scope="row">{newItem.timeOfAbsentee}</td>
                    <td>
                      <Group position="center" mt="xl">
                        <Button
                          type="button"
                          onClick={() => onAbsentEdit(newItem)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          onClick={() => deleteAbsent(newItem.id)}
                        >
                          Sil
                        </Button>
                      </Group>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      </div>
    </>
  );
};

export default AbsentTable;
