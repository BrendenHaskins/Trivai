**Trivai**

Trivai is an LLM-powered trivia application that generates trivia questions based on user-selected media types and genres. The application leverages a modern Express.js backend and a custom single-page application (SPA) frontend. For the LLM service, Groq is used - specifically with the moodel meta-llama/llama-4-scout.

**Setup Instructions**
Prerequisites
Node.js (v14 or higher)
npm (v6 or higher)

**Installation**

- Clone the repository:
```
git clone <repository-url>
cd trivai
```
- Install dependencies:
```
npm install
```
- Configure environment variables:
Create a .env file in the root directory.
Add the following variables:
```
PORT = [port goes here]
KEY=[api key here]
```
You can get an API key from https://console.groq.com.
 - Run the application:
```
npm run dev
```

The server will start and listen on the port specified in .env.

 - Access the application:

Open your browser and navigate to http://localhost:[port goes here].

Notes
The backend communicates with an LLM API (Groq) to generate trivia content. Ensure your API key is valid and has sufficient quota.
The frontend is a custom SPA and does not use frameworks like React or Vue.
For development, static files are served from the public/ directory.

**License**

This project is licensed under the AGPL-3.0 license. See package.json for details.