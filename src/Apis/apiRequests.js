import axios from "axios";

const baseUrl = "http://localhost:5271/api";

const services = {
  fetchAllAbsent: () => axios.get(baseUrl + "/Absent/getall"),
  fetchByIdAbsent: (id) => axios.get(baseUrl + "/Absent/getbyid" + id),
  createAbsent: (newRecord) => axios.post(baseUrl + "/Absent/add", newRecord),
  updateAbsent: (id, updateRecord) =>
    axios.patch(baseUrl + "/Absent/update/" + id, updateRecord),
  deleteAbsent: (id) =>
    axios.delete(baseUrl + "/Absent/delete/" + id),

  fetchAllLateCome: () => axios.get(baseUrl + "/LateCome/getall"),
  fetchByIdLateCome: (id) => axios.get(baseUrl + "/LateCome/getbyid" + id),
  createLateCome: (newRecord) =>
    axios.post(baseUrl + "/LateCome/add", newRecord),
  updateLateCome: (id, updateRecord) =>
    axios.patch(baseUrl + "/LateCome/update/" + id, updateRecord),
  deleteLateCome: (id) =>
    axios.delete(baseUrl + "/LateCome/delete/" + id),

  fetchAllEarlyLeave: () => axios.get(baseUrl + "/EarlyLeave/getall"),
  fetchByIdEarlyLeave: (id) => axios.get(baseUrl + "/EarlyLeave/getbyid" + id),
  createEarlyLeave: (newRecord) =>
    axios.post(baseUrl + "/EarlyLeave/add", newRecord),
  updateEarlyLeave: (id, updateRecord) =>
    axios.patch(baseUrl + "/EarlyLeave/update/" + id, updateRecord),
  deleteEarlyLeave: (id) =>
    axios.delete(baseUrl + "/EarlyLeave/delete/" + id),

  fetchAllOnLeave: () => axios.get(baseUrl + "/OnLeaver/getall"),
  fetchByIdOnLeave: (id) => axios.get(baseUrl + "/OnLeaver/getbyid" + id),
  createOnLeave: (newRecord) =>
    axios.post(baseUrl + "/OnLeaver/add", newRecord),
  updateOnLeave: (id, updateRecord) =>
    axios.patch(baseUrl + "/OnLeaver/update/" + id, updateRecord),
  deleteOnLeave: (id) =>
    axios.delete(baseUrl + "/OnLeaver/delete/" + id),

  fetchAllReturnsFromQualityAssurance: () =>
    axios.get(baseUrl + "/ReturnsFromQualityAssurance/getall"),
  fetchByIdReturnsFromQualityAssurance: (id) =>
    axios.get(baseUrl + "/ReturnsFromQualityAssurance/getbyid" + id),
  createReturnsFromQualityAssurance: (newRecord) =>
    axios.post(baseUrl + "/ReturnsFromQualityAssurance/add", newRecord),
  updateReturnsFromQualityAssurance: (id, updateRecord) =>
    axios.patch(baseUrl + "/ReturnsFromQualityAssurance/update/" + id, updateRecord),
  deleteReturnsFromQualityAssurance: (id) =>
    axios.delete(baseUrl + "/ReturnsFromQualityAssurance/delete/" + id),

  fetchAllWorkPlan: () => axios.get(baseUrl + "/WorkPlan/getall"),
  fetchByIdWorkPlan: (id) => axios.get(baseUrl + "/WorkPlan/getbyid" + id),
  createWorkPlan: (newRecord) =>
    axios.post(baseUrl + "/WorkPlan/add", newRecord),
  updateWorkPlan: (id, updateRecord) =>
    axios.patch(baseUrl + "/WorkPlan/update/" + id, updateRecord),
  deleteWorkPlan: (id) =>
    axios.delete(baseUrl + "/WorkPlan/delete/" + id),

  fetchAllProduct: () => axios.get(baseUrl + "/Product/getall"),
  fetchByIdProduct: (id) => axios.get(baseUrl + "/Product/getbyid" + id),
  createProduct: (newRecord) =>
    axios.post(baseUrl + "/Product/add", newRecord),
  updateProduct: (id, updateRecord) =>
    axios.patch(baseUrl + "/Product/update/" + id, updateRecord),
  deleteProduct: (id) =>
    axios.delete(baseUrl + "/Product/delete/" + id),
};

const apiCall = (name) => {
  return services[name];
};

export default apiCall;