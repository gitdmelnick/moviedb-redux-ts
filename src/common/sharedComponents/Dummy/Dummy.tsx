import * as React from "react";
import cl from "./Dummy.module.css";

type DummyProps = {
  text: string;
};

export const Dummy = ({ text = "Nothing to see here" }:DummyProps) => {
  return (
    <div className={cl.dummyContainer}>
      <h1 className={cl.dummyText}>{text}</h1>
    </div>
  );
};
