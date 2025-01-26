import ModelClient from "@azure-rest/ai-inference";
import {
    AzureKeyCredential
} from "@azure/core-auth";
import {
    inject
} from "@vercel/analytics"
import { Octokit } from "@octokit/rest";

inject();

const token =
    import.meta.env.VITE_GITHUB_TOKEN;

async function getAvailableModels() {
    try {
        // Fetch the JSON file
        const response = await fetch("models.json"); // Ensure models.json is in the same directory or provide the correct path
        if (!response.ok) {
        throw new Error("Failed to fetch models.json");
        }

        // Parse the JSON
        const models = await response.json();
        // Check if the fetched data is an array
    
        return models;
    } catch (error) {
        console.error("Error fetching marketplace items:", error);
        return [];
    }
}

async function populateModelSelect(index){
    // Create the select element
    const modelSelect = document.createElement('select');
    console.log(`index: ${index}`)
    if(index==0)
    {
        modelSelect.id = 'modelSelectSonnet'; // Set the id attribute to 'modelSelect'
    }
    else
    {
        modelSelect.id = 'modelSelectTranslation'; // Set the id attribute to 'modelSelect'
    }
    const models=await getAvailableModels();
    
    modelSelect.innerHTML='';
    models.forEach((model) =>{
        const option=document.createElement('option');
        option.value=model.name;
        option.textContent=model.name;
        modelSelect.appendChild(option);
    })
    return modelSelect;
}

async function generateSonnet(theme,model) {
    console.log("generateSonnet function called with theme:", theme);
    console.log("generateSonnet function with model: ", model);
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
                model: model,
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

async function translateSonnet(sonnet, language,model) {
    console.log("translateSonnet function called with language:", language);
    console.log("translateSonnet function called with model: ", model);
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
                model: model,
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

document.addEventListener('DOMContentLoaded',async () => {
    console.log("DOM content loaded");
    addCopyButtons(); 
    await addModelSelect();
    const button = document.querySelector('button');
    const sonnetOutput = document.getElementById('sonnet');
    const translationOutput = document.getElementById('translation');
    const themeSelect = document.getElementById('themeSelect');
    const languageSelect = document.getElementById('languageSelect');
    const modelSelectSonnet=document.getElementById('modelSelectSonnet');
    const modelSelectTranslation=document.getElementById('modelSelectTranslation');
    if (!button || !sonnetOutput || !translationOutput || !themeSelect || !languageSelect) {
        console.error("Required elements not found!");
        return;
    }

    console.log("Elements found, adding click listener");
    let isLoading = false;
    
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
            const sonnetModel=modelSelectSonnet.value;
            console.log(sonnetModel);
            const sonnetText = await generateSonnet(selectedTheme,sonnetModel);
            sonnetOutput.value = sonnetText;

            // Translate sonnet
            translationOutput.value = "Translating...";
            const selectedLanguage = languageSelect.value;
            const translationModel=modelSelectTranslation.value;
            console.log(translationModel);
            const translation = await translateSonnet(sonnetText, selectedLanguage,translationModel);
            translationOutput.value = translation;
        } finally {
            isLoading = false;
            button.disabled = false;
            button.textContent = 'GO';
        }
    });
});

async function addModelSelect() {
    const boxes = document.querySelectorAll('.box');
    for (let index = 0; index < boxes.length; index++) {
        const box=boxes[index];
        // Create the div element for the select group
        const selectGroupDiv = document.createElement('div');
        selectGroupDiv.classList.add('select-group'); // Add the class 'select-group'

        // Create the label for the select input
        const label = document.createElement('label');
        label.classList.add('select-label'); // Add the class 'select-label'
        label.textContent = 'Models'; // Set the label text

        
        const modelSelect=await populateModelSelect(index);
        
        // Append the label and select elements to the select group div
        selectGroupDiv.appendChild(label);
        selectGroupDiv.appendChild(modelSelect);
        box.insertBefore(selectGroupDiv, box.querySelector('textarea'));
    };
}

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
        box.insertBefore(copyButton,null);
    });
}