export const useFormRules = (initialPassword: string = "") => {
	const password = ref(initialPassword);

	const rules = computed(() => ({
		required: (value: string) => !!value || "Field is required",
		samePassword: (value: string) => value === password.value || "Password does not match"
	}));

	return { rules, password };
};