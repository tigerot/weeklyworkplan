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
  createStyles,
  Anchor,
  rem,
  Flex
} from "@mantine/core";
import axios from "axios";
import OnLeaveForm from "./OnLeaveForm";
import OnLeaveTable from "./OnLeaveTable";
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

const OnLeave = () => {

  const [editOnLeaveState, setEditOnLeaveState] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const onOnLeaveEdit = (data) => {
    setEditOnLeaveState(data);
    open();
  };

  const { classes } = useStyles();

  const items = (
    <Anchor color="black" size="lg">
      Built By Teknim @ 2023
    </Anchor>
  );

  const [onleaves, setOnLeaves] = useState([]);

  useEffect(() => {
    (async () => await loadOnLeaves())();
  }, []);

  async function loadOnLeaves() {
    const result = await apiCall("fetchAllOnLeave")();
    setOnLeaves(result.data);
  }

  return (
    <div>
      <Group position="center" mt="xl">
        <Button color="green" onClick={open}>İzinde Kişi Oluştur</Button>
      </Group>
      <OnLeaveForm opened={opened} onClose={close} loadOnLeaves={loadOnLeaves} editOnLeaveState={editOnLeaveState} />
      <>
        <OnLeaveTable onleaves={onleaves} loadOnLeaves={loadOnLeaves} onOnLeaveEdit={onOnLeaveEdit} />
      </>
    </div>
  );
};



export default OnLeave;
