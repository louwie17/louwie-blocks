/**
 * WordPress dependencies
 */
import { getContext, store } from '@wordpress/interactivity';

const { state } = store('interactivity-api-collapsable-toggle__store', {
    actions: {
        toggle: () => {
            const context: { id: string; group?: string } = getContext();
            if (context.group) {
                if (state[context.group] === context.id) {
                    state[context.group] = '';
                } else {
                    state[context.group] = context.id;
                }
            } else {
                if (!state[context.id]) {
                    state[context.id] = {}
                }
                state[context.id].isOpen = !state[context.id].isOpen;
            }
        },
    },
});