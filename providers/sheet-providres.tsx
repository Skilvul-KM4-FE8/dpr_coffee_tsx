"use client";

import EditMenuSheet from "@/features/menu/components/edit-menu-sheet";
import NewMenuSheet from "@/features/menu/components/new-menu-sheet";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState()

  if (!isMounted) return null

  return (
    <>
      <EditMenuSheet />
      <NewMenuSheet />
    </>
  );
};

export default SheetProvider;
