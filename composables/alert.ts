const alert = ref(false);
const alertMessage = ref("");
const alertType: Ref<"error" | "success" | "warning" | "info" | undefined> = ref(undefined);

export const useAlert = () => {
	const showAlert = (message: string, type: "error" | "success" | "warning" | "info" | undefined, duration = 4000) => {
		alertMessage.value = message;
		alertType.value = type;
		alert.value = true;

		setTimeout(() => {
			alert.value = false;
		}, duration);
	};
  
	return {alert, alertMessage, alertType, showAlert};
};
