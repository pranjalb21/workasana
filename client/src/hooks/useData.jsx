import { useContext } from "react";
import { DataContext } from "../contexts/application.context";

const useData = () => useContext(DataContext);
export default useData;