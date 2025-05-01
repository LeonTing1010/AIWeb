import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPage = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t("privacy.title")}</h2>
      
      <section>
        <h3>{t("privacy.dataCollection")}</h3>
        <p>{t("privacy.dataCollectionText")}</p>
      </section>
      
      <section>
        <h3>{t("privacy.dataUse")}</h3>
        <p>{t("privacy.dataUseText")}</p>
      </section>
      
      <section>
        <h3>{t("privacy.dataProtection")}</h3>
        <p>{t("privacy.dataProtectionText")}</p>
      </section>
    </div>
  );
};

export default PrivacyPage;