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

const EarlyLeaveTable = ({
  earlyleaves,
  onEarlyLeaveEdit,
  loadEarlyLeaves,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  async function deleteEarlyLeave(id) {
    await apiCall("deleteEarlyLeave")(id);
    alert("Başarıyla Silindi");

    loadEarlyLeaves();
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
              {earlyleaves
                .filter(
                  (item) =>
                    item.onlyDate === dayjs(selectedDate).format("DD-MM-YYYY")
                )
                .map((newItem, index2) => (
                  <tr key={newItem.id}>
                    <td scope="row">{newItem.earlyLeave}</td>
                    <td scope="row">{newItem.timeOfEarlyLeave}</td>
                    <td>
                      <Group position="center" mt="xl">
                        <Button
                          type="button"
                          onClick={() => onEarlyLeaveEdit(newItem)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          onClick={() => deleteEarlyLeave(newItem.id)}
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

export default EarlyLeaveTable;
