// themeManager.js

export const themes = [
    "Love",
    "Nature",
    "War",
    "Friendship",
    "Loss",
    "Hope",
    "Mystery",
];

export function populateThemeDropdown(dropdownElement) {
    if (!dropdownElement) {
        console.error("Theme dropdown element not found!");
        return;
    }

    themes.forEach((theme) => {
        const option = document.createElement("option");
        option.value = theme;
        option.textContent = theme;
        dropdownElement.appendChild(option);
    });

    console.log("Theme dropdown populated.");
}
