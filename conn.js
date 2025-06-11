async function groq_query(prompt, key) {
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const data = {
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    messages: [
      {
        role: 'user',
        content: `${prompt}`,
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    const response = json.choices[0].message.content ?? "No response found...";
    return response;

  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

export default groq_query;