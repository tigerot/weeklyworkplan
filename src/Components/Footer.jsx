import { createStyles, Container, Group, Anchor, rem, Flex } from '@mantine/core';

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

  const Footer = () => {

    const { classes } = useStyles();

  const items = (
    <Anchor color="black" size="lg">
      Built By Teknim @ 2023
    </Anchor>
  );

  return (
  <Flex
        mih={50}
        gap="lg"
        justify="center"
        align="flex-end"
        direction="row"
        wrap="wrap"
      >
        <div className={classes.footer}>
          <Container className={classes.inner}>
            <img src="Teknim.png" alt="Teknim Logo" />
            <Group className={classes.links}>{items}</Group>
          </Container>
        </div>
      </Flex>
      );
  };

  export default Footer;