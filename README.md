# Shakespearean Made Easy 🎭

An AI-powered Shakespeare sonnet generator and translator that brings the Bard's poetic style into multiple languages.

## 🌟 Features

* Generate Shakespearean-style sonnets on various themes
* Translate sonnets into 20+ languages
* Modern, responsive design
* One-click copy functionality
* Real-time generation and translation

## 🖼️ Preview

https://github.com/user-attachments/assets/e791d499-47bb-4382-9a43-83e152771d46

## 🚀 Live Demo

Visit the live application: [Shakespearean Made Easy](https://shakespearean-made-easy.vercel.app/)

## 🛠️ Technologies Used

* Vite.js
* GitHub Models (Azure AI)
* HTML5/CSS3
* JavaScript (ES6+)
* Font Awesome Icons

## 📋 Available Themes

Art, Beauty, Desire, Friendship, Jealousy, Love, Loss, Mortality, Nature, Poetry, Time

## 🌍 Supported Languages

Arabic, Bengali, Chinese (Simplified), Chinese (Traditional), English, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Marathi, Portuguese, Punjabi, Russian, Spanish, Tamil, Telugu, Urdu, Vietnamese

## 🏗️ Installation
* Install Node.js: \
  Install [Node.js](https://nodejs.org/en) for your operating system. Verify the installation by running `node -v` and `npm -v` in your terminal. \
  ‎  
* Clone the repository:
  ```
  git clone https://github.com/karenwky/shakespearean-made-easy.git
  ```
* Navigate to the project directory:
  ```
  cd shakespearean-made-easy
  ```
* Install dependencies:
  ```
  npm install
  ```
* Create a `.env` file in the root directory and add your [GitHub personal access token (PAT)](https://github.com/settings/tokens) or [Azure production key](https://ai.azure.com/github?modelName=Phi-3.5-MoE-instruct&ghid=f3e91a190fd8a2c95dd7eb6d678f0678):
  ```
  VITE_GITHUB_TOKEN=your_api_key
  ```
* Start the development server:
  ```
  npm run dev
  ```

## 🚀 Building for Production

```
npm run build
```

The built files will be in the `dist` directory.

## 🙌 Improvements Wishlist

Contributions are welcomed! Here are some areas we'd love to see improved:

* Error Handling
  * Error message shown in box value text, e.g., `Too many requests, please try again later.`
  * Re-enable "GO" button for running request again
* Separate CSS file ✅ ([PR#2](https://github.com/karenwky/shakespearean-made-easy/pull/2))
* Separate file to maintain theme and translation language selection list
* Dropdowns for selecting foundation models
* Reposition copy buttons to align horizontally with h2, in the upper right corner of the box class
  <img width="482" alt="image" src="https://github.com/user-attachments/assets/1479a17c-eed2-4464-9cc6-d6ba8ec3d24f" />
* Auto regenerate GitHub personal access token

## 🤝 Contributing

* Fork the repository
* Create your feature branch (`git checkout -b feature/AmazingFeature`)
* Commit your changes (`git commit -m 'Add some AmazingFeature'`)
* Push to the branch (`git push origin feature/AmazingFeature`)
* Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

* Shakespeare's timeless works for inspiration
* [GitHub Models](https://docs.github.com/en/github-models/prototyping-with-ai-models) for powering the sonnet generation and translation
* Cursor for AI coding assistant

## 📱 Responsive Design

The application is fully responsive and works on:

* Desktop computers
* Tablets
* Mobile devices
