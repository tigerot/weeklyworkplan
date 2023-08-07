import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import WorkPlanForm from "./WorkPlanForm";
import WorkPlanTable from "./WorkPlanTable";
import { createStyles, Container, Group, Anchor, rem, Flex, Button } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import apiCall from "../Apis/apiRequests";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const WorkPlan = () => {
  
  const [workplans, setWorkPlans] = useState([]);

  const [editWorkPlanState, setEditWorkPlanState] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const onWorkPlanEdit = (data) => {
    setEditWorkPlanState(data);
    open();
  };

  const { classes } = useStyles();

  const items = (
    <Anchor color="black" size="lg">
      Built By Teknim @ 2023
    </Anchor>
  );

  useEffect(() => {
    (async () => await loadWorkPlan())();
  }, []);

  async function loadWorkPlan() {
    const result = await apiCall("fetchAllWorkPlan")();
    setWorkPlans(result.data);
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
    <div>
      <Group position="center" mt="lg">
        <Button color="green" onClick={open}>İş Planı Oluştur</Button>
      </Group>
      <WorkPlanForm opened={opened} onClose={close} loadWorkPlan={loadWorkPlan} editWorkPlanState={editWorkPlanState} />
      <>
        <>
          <WorkPlanTable workplans={workplans} loadWorkPlan={loadWorkPlan} onWorkPlanEdit={onWorkPlanEdit} />
        </>
      </>
    </div>
  );
};



export default WorkPlan;
