import { useSnackbar } from 'notistack';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface ToastHook {
  toastInfo: (message: string) => void;
  toastSuccess: (message: string) => void;
  toastWarning: (message: string) => void;
  toastError: (message: string) => void;
}

export const useToast = (): ToastHook => {
  const { enqueueSnackbar } = useSnackbar();

  function toast(message: string, type: AlertType = 'info'): void {
    enqueueSnackbar(message, {
      variant: type,
      autoHideDuration: 5000,
    });
  }

  function toastInfo(message: string): void {
    toast(message, 'info');
  }

  function toastSuccess(message: string): void {
    toast(message, 'success');
  }

  function toastWarning(message: string): void {
    toast(message, 'warning');
  }

  function toastError(message: string): void {
    toast(message, 'error');
  }

  return { toastInfo, toastSuccess, toastWarning, toastError };
};
