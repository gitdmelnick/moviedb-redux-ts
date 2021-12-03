import cl from "./Dummy.module.css";

type DummyProps = {
  text?: string;
};

const Dummy = ({ text = "Nothing to see here" }: DummyProps) => {
  return (
    <div className={cl.dummyContainer}>
      <h1 className={cl.dummyText}>{text}</h1>
    </div>
  );
};

export default Dummy;
