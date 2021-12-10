import s from "./Footer.module.css";

const Footer = () => {
  return (
    <div>
      <div className={s["footer-wrapper"]} />
      <div className={s.footer}></div>
    </div>
  );
};

export default Footer;
