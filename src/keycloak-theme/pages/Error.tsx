import React from "react";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { ErrorPage } from "../components/error/ErrorPage";
import { TwoColumnLayout } from "../components/layout/TwoColumnLayout";

interface Props {
  kcContext: Extract<KcContext, { pageId: "error.ftl" }>;
  i18n: I18n;
}

export const Error: React.FC<Props> = ({ kcContext, i18n }) => {
  const { message, client } = kcContext;

  const handleHome = () => {
    if (client?.baseUrl) {
      window.location.href = client.baseUrl;
    } else {
      window.location.href = "/";
    }
  };

  return (
    <TwoColumnLayout kcContext={kcContext} i18n={i18n}>
      <ErrorPage
        title={i18n.msgStr("errorTitle")}
        errorMessage={message?.summary}
        showHome={!!client?.baseUrl}
        showBack={true}
        onHome={handleHome}
        i18n={i18n}
      />
    </TwoColumnLayout>
  );
};
