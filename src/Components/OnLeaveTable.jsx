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
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import CalendarSelection from "./CalendarSelection";
import apiCall from "../Apis/apiRequests";

const OnLeaveTable = ({ onleaves, loadOnLeaves, onOnLeaveEdit }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  let dayArray = [dayjs(selectedDate).startOf("week")];
  for (let increment = 1; increment < 7; increment++) {
    dayArray.push(dayArray[0].add(increment, "day"));
  }

  async function deleteOnLeave(id) {
    await apiCall("deleteOnLeave")(id);
    alert("Başarıyla Silindi");

    loadOnLeaves();
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
                <th scope="col">Gün Sayısı</th>
              </tr>
            </thead>
            <tbody>
              {onleaves
                .filter(
                  (item) =>
                    item.onlyDate === dayjs(selectedDate).format("DD-MM-YYYY")
                )
                .map((newItem, index2) => (
                  <tr key={newItem.id}>
                    <td scope="row">{newItem.onLeave}</td>
                    <td scope="row">{newItem.durationOfOnLeave}</td>
                    <td>
                      <Group position="center" mt="xl">
                        <Button
                          type="button"
                          onClick={() => onOnLeaveEdit(newItem)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          onClick={() => deleteOnLeave(newItem.id)}
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



export default OnLeaveTable;
