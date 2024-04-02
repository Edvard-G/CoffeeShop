import { type FC, type ReactNode } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

type BaseTemplateProps = {
  children: ReactNode;
};

const BaseTemplate: FC<BaseTemplateProps> = ({ children }) => {
  return (
    <div className="bt-root-div">
      <Header />
      <main className="bt-child-wrapper">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseTemplate;
