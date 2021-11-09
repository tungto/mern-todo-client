export const authReducer = (state, action) => {
	const {
		type,
		payload: { isAuthenticated, user },
	} = action;

	if (type === 'SET_AUTH') {
		return { ...state, authLoading: false, isAuthenticated, user };
	}

	return { ...state };
};
