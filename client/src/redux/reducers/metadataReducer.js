import { SET_METADATA } from '../actions/actionsMetadata';

const initialState = {
	metadata: undefined,
};

const metadataReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_METADATA:
			return {
				...state,
				metadata: payload,
			};
		default:
			return state;
	}
};

export default metadataReducer;
