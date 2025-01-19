import { accountSchemaType } from "../validations/Account.validation";
import { DynamicData } from "./DynamicData";

export interface AccountState {
  isLoading: boolean;
  accounts: DynamicData[];
  error: string | null;
  isAccountModelOpen: boolean;
}

export type AccounFormProps = {
  accountData?: accountSchemaType | null;
  onClose: () => void;
};
