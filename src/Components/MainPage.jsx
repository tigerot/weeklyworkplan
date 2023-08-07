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
  Flex,
  Space,
  createStyles,
  Anchor,
  rem,
  Modal,
} from "@mantine/core";
import axios from "axios";
import { MapSearch, AddressBook, ChessKing } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import apiCall from "../Apis/apiRequests";

const initialFieldValuesProducts = {
  ProductName: "",
  ProductStatus: true,
};

const MainPage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productStatus, setProductStatus] = useState(true);
  const [products, setProducts] = useState([]);

  const [valuesProducts, setValuesProducts] = useState(
    initialFieldValuesProducts
  );

  useEffect(() => {
    (async () => await loadProducts())();
  }, []);

  async function loadProducts() {
    const result = await apiCall("fetchAllProduct")();
    setProducts(result.data);
  }

  async function saveProduct(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5271/api/Product/add", {
        ProductName: productName,
      });
      alert("Kayıt Başarılı");
      setProductId("");
      setProductName("");

      loadProducts();
    } catch (error) {
      alert(error);
    }
  }

  async function editProducts(products) {
    setProductName(products.productName);
    setProductStatus(products.productStatus);

    setProductId(products.id);
  }

  async function deleteProduct(id) {
    await axios.delete("http://localhost:5271/api/Product/delete/" + id);
    alert("Başarıyla Silindi");
    setProductName("");
    setProductId("");

    loadProducts();
  }

  async function updateProduct(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "http://localhost:5271/api/Product/update/" +
          products.find((product) => product.id == productId).id || productId,
        {
          Id: productId,
          ProductName: productName,
        }
      );
      alert("Başarıyla Güncellendi");
      setProductName("");
      setProductId("");

      loadProducts();
    } catch (error) {
      alert(error);
    }
  }

  let navigate = useNavigate();

  const routeToWorkPlan = () => {
    let path = `/Workplan`;
    navigate(path);
  };

  const routeToAttendance = () => {
    let path = `/Attendance`;
    navigate(path);
  };

  const routeToQualityReturn = () => {
    let path = `/QualityReturn`;
    navigate(path);
  };

  //const [roles, setRoles] = useState([]);

  /*useEffect(() => {
    (async () => await loadRoles())();
  }, []);

  async function loadRoles() {
    const result = await axios.get("http://localhost:5271/api/Role/getdemo");
    setRoles(result.data);
  }*/

  return (
    <>
      <Flex
        mih={50}
        gap="xl"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        h="80vh"
      >
        <Group position="center" spacing="xl">
          <Button size="xl" onClick={routeToWorkPlan}>
            <MapSearch size={60} strokeWidth={2} color={"#19204d"} />
            <h3>İş Planı</h3>
          </Button>
          
          <Button size="xl" onClick={routeToAttendance}>
            <AddressBook size={60} strokeWidth={2} color={"#19204d"} />
            <h3>Devamsızlık</h3>
          </Button>
          
              <Button size="xl" onClick={routeToQualityReturn}>
                <ChessKing size={60} strokeWidth={2} color={"#19204d"} />
                <h3>Kalite</h3>
              </Button>
            
         
          
              <>
                <Modal
                  fullScreen
                  opened={opened}
                  onClose={close}
                  title="Ürünler"
                  centered
                >
                  {
                    <Container>
                      <form autoComplete="off" noValidate>
                        <TextInput
                          type="hidden"
                          value={productId}
                          withAsterisk
                          onChange={(event) =>
                            setProductId(event.currentTarget.value)
                          }
                        />
                        <TextInput
                          label="Ürün Adı:"
                          value={productName}
                          withAsterisk
                          onChange={(event) =>
                            setProductName(event.currentTarget.value)
                          }
                        />

                        <Group position="center" mt="xl">
                          <Button type="submit" onClick={saveProduct}>
                            ekle
                          </Button>
                          <Button type="submit" onClick={updateProduct}>
                            güncelle
                          </Button>
                        </Group>

                        <Table mt="md" striped withBorder withColumnBorders>
                          <thead>
                            <tr>
                              <th scope="col">Product Name</th>
                            </tr>
                          </thead>
                          {products.map(function fn(product) {
                            return (
                              <tbody>
                                <tr>
                                  <td scope="row">{product.productName}</td>
                                  <td>
                                    <Group position="center" mt="xl">
                                      <Button
                                        type="button"
                                        onClick={() => editProducts(product)}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          deleteProduct(product.id)
                                        }
                                      >
                                        Sil
                                      </Button>
                                    </Group>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                        </Table>
                      </form>
                    </Container>
                  }
                </Modal>
              </>
        </Group>
      </Flex>
    </>
  );
};

/*<>
      <Flex
        mih={50}
        gap="xl"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        h="80vh"
      >
        <Group position="center" spacing="xl">
          <Button size="xl" onClick={routeToWorkPlan}>
            <MapSearch size={60} strokeWidth={2} color={"#19204d"} />
            <h3>İş Planı</h3>
          </Button>

          {roles.map((role) =>
            role.role === "Admin" || role.role === "Sekreter" ? (
              <Button size="xl" onClick={routeToAttendance}>
                <AddressBook size={60} strokeWidth={2} color={"#19204d"} />
                <h3>Devamsızlık</h3>
              </Button>
            ) : (
              <div />
            )
          )}

          {roles.map((role) =>
            role.role === "Admin" || role.role === "Kalite" ? (
              <Button size="xl" onClick={routeToQualityReturn}>
                <ChessKing size={60} strokeWidth={2} color={"#19204d"} />
                <h3>Kalite</h3>
              </Button>
            ) : (
              <div />
            )
          )}

          {roles.map((role) =>
            role.role === "Admin" || role.role === "Kalite" ? (
              <>
                <Modal
                  fullScreen
                  opened={opened}
                  onClose={close}
                  title="Ürünler"
                  centered
                >
                  {
                    <Container>
                      <form
                        autoComplete="off"
                        noValidate
                      >
                        <TextInput
                          type="hidden"
                          value={productId}
                          withAsterisk
                          onChange={(event) =>
                            setProductId(event.currentTarget.value)
                          }
                        />
                        <TextInput
                          label="Ürün Adı:"
                          value={productName}
                          withAsterisk
                          onChange={(event) =>
                            setProductName(event.currentTarget.value)
                          }
                        />

                        <Group position="center" mt="xl">
                          <Button type="submit" onClick={saveProduct}>
                            ekle
                          </Button>
                          <Button type="submit" onClick={updateProduct}>
                            güncelle
                          </Button>
                        </Group>

                        <Table mt="md" striped withBorder withColumnBorders>
                          <thead>
                            <tr>
                              <th scope="col">Product Name</th>
                            </tr>
                          </thead>
                          {products.map(function fn(product) {
                            return (
                              <tbody>
                                <tr>
                                  <td scope="row">{product.productName}</td>
                                  <td>
                                    <Group position="center" mt="xl">
                                      <Button
                                        type="button"
                                        onClick={() => editProducts(product)}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        type="button"
                                        onClick={() => deleteProduct(product.id)}
                                      >
                                        Sil
                                      </Button>
                                    </Group>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                        </Table>
                      </form>
                    </Container>
                  }
                </Modal>

                <Button size="xl" color="blue" onClick={open}>
                  Ürün Oluştur
                </Button>
              </>
            ) : (
              <div />
            )
          )}
        </Group>
      </Flex>
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
    </>
    */

export default MainPage;
