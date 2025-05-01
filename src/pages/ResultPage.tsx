import React from "react";
import { useTranslation } from "react-i18next";
import { useResults } from "../hooks/useResults";

const ResultPage = () => {
  const { t } = useTranslation();
  const { currentResult } = useResults();
  
  if (!currentResult) {
    return <div>No results found</div>;
  }
  
  return (
    <div>
      <h2>{t("results.title")}</h2>
      <p>Total Score: {currentResult.totalScore}</p>
    </div>
  );
};

export default ResultPage;