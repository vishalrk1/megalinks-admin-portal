"use client";
import Modal from "@/components/ui/modal";
import { useCategoryModel } from "@/hooks/use-cat-modal";
import { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useCategoryModel((state) => state.onOpen);
  const isOpen = useCategoryModel((state)=>state.isOpen);

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  }, [onOpen, isOpen]);
  
  return (
    <div className="p-4">
      Root Page
    </div>
  );
};

export default SetupPage;