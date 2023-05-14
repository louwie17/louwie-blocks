// logic around collapsable.

const CLASS_ID_TOGGLE = 'gh-collapsable-toggle';
const CLASS_ID_CONTENT = 'gh-collapsable-content';
const CLASS_ID_PREFIX = 'gh-collapsable__'
const CLASS_ID_GROUP_PREFIX = 'gh-collapsable-group__'
const CLASS_ID_SHOWN = 'gh-collapsable-shown';

function getToggles() {
    return document.querySelectorAll('.' + CLASS_ID_TOGGLE);
}

function onClickToggle(event) {
    event.preventDefault();

    let id = '';
    let groupId = '';
    this.classList.forEach((className) => {
        if (className.startsWith(CLASS_ID_PREFIX)) {
            id = className;
        }
        if (className.startsWith(CLASS_ID_GROUP_PREFIX)) {
            groupId = className;
        }
    });
    if (groupId && id) {
        document.querySelectorAll('.' + groupId).forEach((ele) => {
            if (!ele.classList.contains(id)) {
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

