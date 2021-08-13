import { SET_METADATA, CLEAR_METADATA } from '../actions/actionsMetadata';

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
		case CLEAR_METADATA:
			return {
				...state,
				metadata: undefined,
			};
		default:
			return state;
	}
};

export default metadataReducer;
