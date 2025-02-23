import { TDialog } from "../types/general.type";

// The interface responsible for the structure declaration of dialogs
export interface IActionTrackingDialog
{
  type: TDialog;
  title: string;
  message: string;
}
