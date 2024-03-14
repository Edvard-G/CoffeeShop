import { type FC, type ReactNode } from "react";
import Header from "../layouts/Header";

type BaseTemplateProps = {
  children: ReactNode;
};

const BaseTemplate: FC<BaseTemplateProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
    </div>
  );
};

export default BaseTemplate;
