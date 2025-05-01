import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// SCL-90量表问题钩子
export const useSCL90Questions = () => {
  const { i18n } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 加载问题
  useEffect(() => {
    setQuestions([
      { id: 1, text: "头痛", dimension: "somatization" },
      { id: 2, text: "紧张或焦虑", dimension: "anxiety" },
      { id: 3, text: "脑中有不必要的想法", dimension: "obsessiveCompulsive" },
      { id: 4, text: "头晕或昏厥", dimension: "somatization" },
      { id: 5, text: "对异性的兴趣减退", dimension: "depression" }
    ]);
    setLoading(false);
  }, [i18n.language]);
  
  return { questions, loading, error };
};
