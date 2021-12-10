import s from "./Dummy.module.css";

type DummyProps = {
  text?: string;
};

const Dummy = ({ text = "Nothing to see here" }: DummyProps) => {
  return (
    <div className={s.dummy}>
      <h1 className="heading-1">{text}</h1>
    </div>
  );
};

export default Dummy;
