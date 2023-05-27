// logic around collapsable.
import { CLASS_ID_CONTENT, CLASS_ID_GROUP_PREFIX, CLASS_ID_PREFIX, CLASS_ID_SHOWN, CLASS_ID_TOGGLE } from "./blocks/collapsable-content/constants";

function getToggles() {
    return document.querySelectorAll('.' + CLASS_ID_TOGGLE);
}
function onClickToggle(event: Event) {
    event.preventDefault();

    let id = '';
    let groupId = '';
    this.classList.forEach((className: string) => {
        if (className.startsWith(CLASS_ID_PREFIX)) {
            id = className;
        }
        if (className.startsWith(CLASS_ID_GROUP_PREFIX)) {
            groupId = className;
        }
    });
    if (groupId && id) {
        document.querySelectorAll('.' + groupId).forEach((ele) => {
            if (!ele.classList.contains(id) && ele.classList.contains(CLASS_ID_CONTENT)) {
                ele.classList.remove(CLASS_ID_SHOWN);
            }
        });
    }

    if (id) {
        document.querySelectorAll('.' + id).forEach((ele) => {
            ele.classList.toggle(CLASS_ID_SHOWN);
        });
    }
}

(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const toggles = getToggles();
        toggles.forEach((toggleButton) => {
            toggleButton.addEventListener('click', onClickToggle);
        });
    });
})();

