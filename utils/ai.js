import axios from "axios";
import fs from "fs";
import OpenAI from "openai";

export const test = (testing) => {
  console.log("test has been run:", testing)

  return "test success"
}

// Use this if you want to make a call to OpenAI GPT-4 for instance. userId is used to identify the user on openAI side.
export const gptRequest = async (messages, max = 100, temp = 1) => {
  const url = "https://api.openai.com/v1/chat/completions";
  console.log("DEBUG:", messages)

  // console.log("Ask GPT >>>");
  // messages.map((m) =>
  //   console.log(" - " + m.role.toUpperCase() + ": " + m.content)
  // );

  const body = JSON.stringify({
    model: "gpt-4",
    messages,
    max_tokens: max,
    temperature: temp,
    //user: userId,
  });

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(url, body, options);

    const answer = res.data.choices[0].message.content;
    const usage = res?.data?.usage;

    // console.log(">>> " + answer);
    // console.log(
    //   "TOKENS USED: " +
    //     usage?.total_tokens +
    //     " (prompt: " +
    //     usage?.prompt_tokens +
    //     " / response: " +
    //     usage?.completion_tokens +
    //     ")"
    // );
    // console.log("\n");

    return answer;
  } catch (e) {
    console.error("GPT Error: " + e?.response?.status, e?.response?.data);
    return null;
  }
};

export const textToSpeech = async (text, voice) => {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice}`;

    const body = JSON.stringify({
        // model_id: "",
        text,
        // voice_settings: {
        //     similarity_boost: 123,
        //     stability: 123,
        //     style: 123,
        //     use_speaker_boost: true,
        // },
    });

    const options = {
        headers: {
            "xi-api-key": process.env.ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
    };

    try {
        const res = await axios.post(url, body, options);
        const audio = res.data;
        return audio;
    } catch (e) {
        console.error("TTS Error: " + e?.response?.status, e?.response?.data);
        return null;
    }
};

export const generateImage = async (prompt, provider="DALL-E", size="1024x1024", quality="standard", n=1) => {
  const url = "https://api.openai.com/v1/images/generations";

  const body = JSON.stringify({
    model: "dall-e-3",
    prompt: "I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: " + prompt,
    size,
    quality,
    n
  });

  const options = {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const res = await axios.post(url, body, options);

  const imageUrl = res.data[0].url;

  return imageUrl;
};

export const speechToText = async (b64audio) => {
    // expects audioBytes to be base64 encoded
    const audioBytes = Buffer.from(b64audio, 'base64');
    fs.writeFileSync("audio.mp3", audioBytes);
    
    const openai = new OpenAI();

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream("audio.mp3"),
      model: "whisper-1",
    });

    fs.unlinkSync("audio.mp3");

    return transcription.text
}
