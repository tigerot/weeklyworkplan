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
import ReturnForm from "./ReturnForm";
import ReturnTable from "./ReturnTable";
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

const Return = () => {

  const [editReturnState, setEditReturnState] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const onReturnEdit = (data) => {
    setEditReturnState(data);
    open();
  };

  const { classes } = useStyles();

  const items = (
    <Anchor color="black" size="lg">
      Built By Teknim @ 2023
    </Anchor>
  );

  const [defects, setDefects] = useState([]);

  useEffect(() => {
    (async () => await loadReturnsFromQualityAssurance())();
  }, []);

  async function loadReturnsFromQualityAssurance() {
    const result = await apiCall("fetchAllReturnsFromQualityAssurance")();
    setDefects(result.data);
  }

  return (
    <>
    <div>
    <Group position="center" mt="xl">
        <Button color="green" onClick={open}>
          Kaliteden Dönen Ürün Oluştur
        </Button>
      </Group>
      <ReturnForm opened={opened} onClose={close} loadReturnsFromQualityAssurance={loadReturnsFromQualityAssurance} editReturnState={editReturnState} />
      <>
        <ReturnTable defects={defects} loadReturnsFromQualityAssurance={loadReturnsFromQualityAssurance} onReturnEdit={onReturnEdit} />
      </>
    </div>
  </>
  );
};


export default Return;
