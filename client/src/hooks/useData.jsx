import { useContext } from "react";
import { DataContext } from "../contexts/Application.context";

const useData = () => useContext(DataContext);
export default useData;