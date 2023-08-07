import React, { useState, useEffect } from "react";
import {
  Text,
  Table,
  Group,
  Button
} from "@mantine/core";
import dayjs from "dayjs";
import CalendarSelection from "./CalendarSelection";
import axios from "axios";
import apiCall from "../Apis/apiRequests";

const colors = {
  Başlandı:"yellow",
  İptal:"red",
  Başlanmadı:"blue",
  Tamamlandı:"green",
}

const WorkPlanTable = ({ workplans, loadWorkPlan, onWorkPlanEdit }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  async function deleteWorkPlan(id) {
    await apiCall("deleteWorkPlan")(id);
    alert("Başarıyla Silindi");

    loadWorkPlan();
  }

  /*let workPlanDateArray = [];
  for (const singleValue of Object.keys(props.WeeklyWorkPlan)) {
    const singleWorkPlan = props.WeeklyWorkPlan[singleValue];
    if (!workPlanDateArray.includes(singleWorkPlan.onlyDate)) {
      workPlanDateArray.push(singleWorkPlan.onlyDate);
    }
  }*/

  let dayArray = [dayjs(selectedDate).startOf("week")];
  for (let increment = 1; increment < 7; increment++) {
    dayArray.push(dayArray[0].add(increment, "day"));
  }

  return (
    <>
    <>
    <CalendarSelection selectedDate={selectedDate} onChange={setSelectedDate}/>
    </>
    <div>
      <>
        <Table mt="md" striped withBorder withColumnBorders>
          <thead>
            <tr>
              {dayArray.map((days, index) => (
                <th>
                  <div>{days.format("DD-MM-YYYY")}</div>
                  <div>{days.format("dddd")}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {dayArray.map((days, index) => (
                <td>
                  <Table striped withBorder withColumnBorders>
                    {workplans
                      .filter(
                        (item) => item.onlyDate === days.format("DD-MM-YYYY")
                      )
                      .map((newItem, index2) => (
                        <>
                            <tr>
                          <td scope="col"><b>Ürün:</b></td>
                          <td scope="col"><b>Hattı:</b></td>
                          <td scope="col"><b>Miktarı:</b></td>
                        </tr>

                        <tr>
                          <td scope="row"><Text color={colors[newItem.productStatus]}>{newItem.productName}</Text></td>
                          <td scope="row">{newItem.line}</td>
                          <td scope="row">{newItem.productAmount}</td>
                          <td>
                                    <Group position="center" mt="xl">
                                      <Button
                                        type="button"
                                        onClick={() => onWorkPlanEdit(newItem)}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        type="button"
                                        onClick={() => deleteWorkPlan(newItem.id)}
                                      >
                                        Sil
                                      </Button>
                                    </Group>
                                  </td>
                        </tr>
                        <tr>
                          <td>{newItem.productStatus}</td>
                        </tr>
                        </>
                      ))}
                  </Table>
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </>
    </div>
    </>
  );
};


export default WorkPlanTable;
