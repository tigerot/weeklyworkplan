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

const LateComeTable = ({ latecomes, loadLateComes, onLateComeEdit }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  async function deleteLateCome(id) {
    await apiCall("deleteLateCome")(id);
    alert("Başarıyla Silindi");

    loadLateComes();
  }

  let dayArray = [dayjs(selectedDate).startOf("week")];
  for (let increment = 1; increment < 7; increment++) {
    dayArray.push(dayArray[0].add(increment, "day"));
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
                <th scope="col">Zamanı</th>
              </tr>
            </thead>
            <tbody>
              {latecomes
                .filter(
                  (item) =>
                    item.onlyDate === dayjs(selectedDate).format("DD-MM-YYYY")
                )
                .map((newItem, index2) => (
                  <tr key={newItem.id}>
                    <td scope="row">{newItem.lateComer}</td>
                    <td scope="row">{newItem.timeOfLateComer}</td>
                    <td>
                      <Group position="center" mt="xl">
                        <Button
                          type="button"
                          onClick={() => onLateComeEdit(newItem)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          onClick={() => deleteLateCome(newItem.id)}
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



export default LateComeTable;
