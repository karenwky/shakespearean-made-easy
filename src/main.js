import { populateThemeDropdown } from "./themeManager.js";
import { populateLanguageDropdown } from "./languageManager.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded");

    const button = document.querySelector("button");
    const sonnetOutput = document.getElementById("sonnet");
    const translationOutput = document.getElementById("translation");
    const themeSelect = document.getElementById("themeSelect");
    const languageSelect = document.getElementById("languageSelect");

    if (!button || !sonnetOutput || !translationOutput || !themeSelect || !languageSelect) {
        console.error("Required elements not found!");
        return;
    }

    console.log("Populating dropdowns...");
    populateThemeDropdown(themeSelect);
    populateLanguageDropdown(languageSelect);

    console.log("Elements found, adding click listener");
    let isLoading = false;
    addCopyButtons();

    button.addEventListener("click", async () => {
        if (isLoading) return;
        try {
            isLoading = true;
            button.disabled = true;
            button.textContent = "Generating...";

            console.log("Button clicked");

            // Generate sonnet
            sonnetOutput.value = "Generating sonnet...";
            translationOutput.value = "Waiting for sonnet...";

            const selectedTheme = themeSelect.value;
            const sonnetText = await generateSonnet(selectedTheme);
            sonnetOutput.value = sonnetText;

            // Translate sonnet
            translationOutput.value = "Translating...";
            const selectedLanguage = languageSelect.value;
            const translation = await translateSonnet(sonnetText, selectedLanguage);
            translationOutput.value = translation;
        } finally {
            isLoading = false;
            button.disabled = false;
            button.textContent = "GO";
        }
    });
});

function addCopyButtons() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        const copyButton = document.createElement("button");
        copyButton.className = "copy-button";
        copyButton.innerHTML = '<i class="far fa-copy"></i>';
        copyButton.onclick = () => {
            const textarea = box.querySelector("textarea");
            navigator.clipboard
                .writeText(textarea.value)
                .then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="far fa-copy"></i>';
                    }, 2000);
                })
                .catch((err) => showError("Failed to copy text"));
        };
        box.insertBefore(copyButton, box.querySelector("textarea"));
    });
}
