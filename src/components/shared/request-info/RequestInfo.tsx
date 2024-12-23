import React, { useEffect, useState } from "react";
import tesloApi from "../../../api/tesloApi";

export const RequestInfo = () => {
  const [info, setInfo] = useState<string>();

  useEffect(() => {
    tesloApi
      .get("/auth/private")
      .then((res) => {
        setInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
        setInfo("Error");
      });
  }, []);

  return (
    <>
      <h2>Información de la solicitud</h2>

      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  );
};
