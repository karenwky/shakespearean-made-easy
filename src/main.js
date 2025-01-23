import ModelClient from "@azure-rest/ai-inference";
import {
    AzureKeyCredential
} from "@azure/core-auth";

const token =
    import.meta.env.VITE_GITHUB_TOKEN;

async function generateSonnet(theme) {
    console.log("generateSonnet function called with theme:", theme);
    try {
        const client = new ModelClient(
            "https://models.inference.ai.azure.com",
            new AzureKeyCredential(token)
        );

        console.log("Making sonnet generation API request...");
        const response = await client.path("/chat/completions").post({
            body: {
                messages: [{
                    role: "user",
                    content: `Generate a short sonnet in Shakespeare's style in the theme of ${theme}. 
                    Try your best to mimic Shakespeare's style, NOT something modern.
                    Only provide the sonnet, NO other text. 
                    Remove line breaks within each stanza, but keep line breaks between stanzas.`
                }],
                model: "Phi-4",
                temperature: 0.8,
                max_tokens: 2048,
                top_p: 1
            }
        });

        if (response.status !== "200") {
            throw response.body.error;
        }
        console.log("API response received:", response.body.choices[0].message.content);
        return response.body.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error in generateSonnet:", error);
        throw error;
    }
}

async function translateSonnet(sonnet, language) {
    console.log("translateSonnet function called with language:", language);
    try {
        const client = new ModelClient(
            "https://models.inference.ai.azure.com",
            new AzureKeyCredential(token)
        );

        console.log("Making translation API request...");
        const response = await client.path("/chat/completions").post({
            body: {
                messages: [{
                    role: "user",
                    content: `Translate the provided Shakespeare sonnet into modern ${language}. 
                    NO NEED to repeat the original sonnet. 
                    Maintain the line breaks:\n\n${sonnet}`
                }],
                model: "Phi-4",
                temperature: 0.7,
                max_tokens: 2048,
                top_p: 1
            }
        });

        if (response.status !== "200") {
            throw response.body.error;
        }
        console.log("Translation API response received:", response.body.choices[0].message.content);
        return response.body.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error in translateSonnet:", error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded");
    const button = document.querySelector('button');
    const sonnetOutput = document.getElementById('sonnet');
    const translationOutput = document.getElementById('translation');
    const themeSelect = document.getElementById('themeSelect');
    const languageSelect = document.getElementById('languageSelect');

    if (!button || !sonnetOutput || !translationOutput || !themeSelect || !languageSelect) {
        console.error("Required elements not found!");
        return;
    }

    console.log("Elements found, adding click listener");
    let isLoading = false;
    addCopyButtons();

    button.addEventListener('click', async () => {
        if (isLoading) return;
        try {
            isLoading = true;
            button.disabled = true;
            button.textContent = 'Generating...';
            
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
            button.textContent = 'GO';
        }
    });
});

function addCopyButtons() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="far fa-copy"></i>';
        copyButton.onclick = () => {
            const textarea = box.querySelector('textarea');
            navigator.clipboard.writeText(textarea.value)
                .then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="far fa-copy"></i>';
                    }, 2000);
                })
                .catch(err => showError('Failed to copy text'));
        };
        box.insertBefore(copyButton, box.querySelector('textarea'));
    });
}