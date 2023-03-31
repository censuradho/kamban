import { Kamban } from "@/services/api/kamban/types";

export interface KambanContextParams {
  kamban?: Kamban | null
  findKambanById: (id: string) => Promise<void>
}