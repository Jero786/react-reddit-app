import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTop } from "./actions";

export const useFetchTop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTop());
  }, []); /* eslint-disable-line react-hooks/exhaustive-deps */
};
