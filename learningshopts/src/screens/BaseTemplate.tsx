import { type FC, type ReactNode } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

type BaseTemplateProps = {
  children: ReactNode;
};

const BaseTemplate: FC<BaseTemplateProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default BaseTemplate;
