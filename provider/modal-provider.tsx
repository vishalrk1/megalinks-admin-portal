"use client";

import { useState, useEffect } from "react";

import CategoryModal from "@/components/modals/category-modals";

export const ModalProvider = () => {
  const [isMounded, setIsMounded] = useState(false);

  useEffect(() => {
    setIsMounded(true);
  }, []);

  if (!isMounded) {
    return null;
  }

  return (
    <>
      <CategoryModal />
    </>
  );
};
