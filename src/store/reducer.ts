import { StoreState } from "./types";

const DEFAULT_STATE = {
    activeId: '',
};

export default function reducer(state: StoreState = DEFAULT_STATE, action: { type: string, id: string }) {
    switch (action.type) {
        case 'SET_ACTIVE_ID':
            return {
                ...state,
                activeId: action.id,
            };
    }

    return state;
}