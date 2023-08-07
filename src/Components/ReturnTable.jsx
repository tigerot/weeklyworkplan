import React, { useState } from "react";
import {
  Table,
  Group,
  Button
} from "@mantine/core";
import dayjs from "dayjs";
import CalendarSelection from "./CalendarSelection";
import axios from "axios";
import apiCall from "../Apis/apiRequests";


const ReturnTable = ({ defects, loadReturnsFromQualityAssurance, onReturnEdit }) => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    let dayArray = [dayjs(selectedDate).startOf("week")];
  for (let increment = 1; increment < 7; increment++) {
    dayArray.push(dayArray[0].add(increment, "day"));
  }

  async function deleteReturn(id) {
    await apiCall("deleteReturnsFromQualityAssurance")(id);
    alert("Başarıyla Silindi");

    loadReturnsFromQualityAssurance();
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
                <th scope="col">Ürün</th>
                <th scope="col">Dönme Sebebi</th>
                <th scope="col">Hattı</th>
                <th scope="col">Miktarı</th>
              </tr>
            </thead>
            <tbody>
              {defects
                .filter(
                  (item) =>
                    item.onlyDate === dayjs(selectedDate).format("DD-MM-YYYY")
                )
                .map((newItem, index2) => (
                  <tr key={newItem.id}>
                    <td scope="row">{newItem.defectProduct}</td>
                    <td scope="row">{newItem.defectReason}</td>
                    <td scope="row">{newItem.defectLine}</td>
                    <td scope="row">{newItem.defectAmount}</td>
                    <td>
                                    <Group position="center" mt="xl">
                                      <Button
                                        type="button"
                                        onClick={() => onReturnEdit(newItem)}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        type="button"
                                        onClick={() => deleteReturn(newItem.id)}
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



export default ReturnTable;
