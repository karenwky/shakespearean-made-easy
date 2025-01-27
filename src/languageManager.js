// languageManager.js

export const languages = [
    "French",
    "Spanish",
    "German",
    "Italian",
    "Chinese",
    "Japanese",
    "Russian",
];

export function populateLanguageDropdown(dropdownElement) {
    if (!dropdownElement) {
        console.error("Language dropdown element not found!");
        return;
    }

    languages.forEach((language) => {
        const option = document.createElement("option");
        option.value = language.toLowerCase();
        option.textContent = language;
        dropdownElement.appendChild(option);
    });

    console.log("Language dropdown populated.");
}
