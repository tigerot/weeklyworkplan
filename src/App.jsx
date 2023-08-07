import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import WorkPlan from "./Components/WorkPlan";
import Return from "./Components/Return";
import Absent from "./Components/Absent";
import LateCome from "./Components/LateCome";
import EarlyLeave from "./Components/EarlyLeave";
import OnLeave from "./Components/OnLeave";
import MainPage from "./Components/MainPage";
import Footer from "./Components/Footer";
import React from "react";
import {
  Group,
  createStyles, Container, Anchor, rem
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));



function App(props) {

  const { classes } = useStyles();
  
  const items = 
    <Anchor
      color="dimmed"
      size="sm"
    >
      Teknim
    </Anchor>

  

  return (
      <ToastProvider autoDismiss={true}>
        <Routes>
          <Route
            path="/"
            element={
              <>
              <div>
                <Group position="center" mt="xl">
                <Link to="/">
                  <img src="Teknim.png" alt="Teknim Logo" />
                </Link>
                </Group>
                <MainPage />
                <Footer />
              </div>
            </>
            }
          />
          <Route
            path="/Attendance"
            element={
              <div>
                <Group position="center" mt="xl">
                  <Link to="/">
                  <img src="Teknim.png" alt="Teknim Logo" />
                  </Link>
                </Group>
                <Absent />
                <LateCome />
                <EarlyLeave />
                <OnLeave />
                <Footer />
              </div>
            }
          />
          <Route
            path="/WorkPlan"
            element={
              <div>
                <Group position="center" mt="xl">
                <Link to="/">
                  <img src="Teknim.png" alt="Teknim Logo" />
                </Link>
                </Group>
                <WorkPlan />
                <Footer />
              </div>
            }
          />
          <Route
            path="/QualityReturn"
            element={
              <div>
                <Group position="center" mt="xl">
                <Link to="/">
                  <img src="Teknim.png" alt="Teknim Logo" />
                </Link>
                </Group>
                <Return />
                <Footer />
              </div>
            }
          />
          <Route
            path="/Admin"
            element={
              <div>
                <Group position="center" mt="xl">
                <Link to="/">
                  <img src="Teknim.png" alt="Teknim Logo" />
                </Link>
                </Group>
                <WorkPlan />
                <Return />
                <Absent />
                <LateCome />
                <EarlyLeave />
                <OnLeave />
              </div>
            }
          />
        </Routes>
      </ToastProvider>
  );
}

/*<Routes>
        <Route path="/"  element={<div className="App"><NameWrapper /></div>} />
        <Route path="/buttons" element={<div className="App"><ButtonWrapper /></div>} />
</Routes>*/

export default App;
