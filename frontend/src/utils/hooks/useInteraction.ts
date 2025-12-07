import { useContext } from "react";
import { UIInteractionContext } from "../../core/context/interaction/InteractionContext";

export function useUIInteractions() {
  return useContext(UIInteractionContext);
}
