import s from "./FormErrorCard.module.css";

type FormErrorCardProps = {
  errorMessages: string[];
};

const FormErrorCard = ({ errorMessages }: FormErrorCardProps) => {
  const messagesHtml = errorMessages.map((message, i) => {
    return (
      <li key={i}>
        <p>{message}</p>
      </li>
    );
  });

  return (
    <div className={s["error-card"]}>
      <div className={s["error-header"]}>
        <h3 className="heading-3">There seems to be a problem</h3>
      </div>
      <div className={s["error-body"]}>
        <ul>{messagesHtml}</ul>
      </div>
    </div>
  );
};

export default FormErrorCard;
