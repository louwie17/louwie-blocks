/**
 * WordPress dependencies
 */
import { getContext, store } from '@wordpress/interactivity';

const { state } = store('interactivity-api-collapsable-toggle__store', {
    state: {
        get isOpen(): boolean {
            const context: { id: string; group?: string } = getContext();
            if (context.group) {
                return state[context.group] === context.id;
            }
            return state[context.id].isOpen || false;
        },
    },
});