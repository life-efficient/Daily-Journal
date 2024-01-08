import MicRecorder from "mic-recorder-to-mp3";
import apiClient from "@/utils/api";

export default class AudioRecordingHandler {
    constructor(setConversationState, onFailure, setGeneratedAudio, setSound) {
        this.setConversationState = setConversationState
        this.setSound = setSound
        this.onFailure = onFailure
        this.setGeneratedAudio = setGeneratedAudio
    }
    
    startRecording = async (showError) => {
        this.recorder = new MicRecorder();
        this.recorder.start(); // Start recording
    };

    stopRecording = (messages, setMessages, voice) => {
        this.recorder.stop().getMp3().then(([buffer, blob]) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(blob);
            
            reader.onloadend = async () => {
                const arrayBuffer = reader.result; // Get the ArrayBuffer from the reader
                const audioBytes = new Uint8Array(arrayBuffer); // Create a Uint8Array from the ArrayBuffer
                const base64StringAudio = btoa([].reduce.call(new Uint8Array(audioBytes),function(p,c){return p+String.fromCharCode(c)},'')); // Convert the Uint8Array to a base64 string
                
                let str_messages = JSON.stringify(messages)
                let payload = JSON.stringify({
                    "audio": base64StringAudio,
                    "messages": str_messages,
                    "voice": voice
                })
                apiClient.post("/listen", payload)
                .then(data => {
                    messages = data.messages
                    setMessages(messages)
                    let audio = data.audio
                    let fetchableUrl = 'data:audio/wav;base64,' + audio;
                    return fetch(fetchableUrl)
                })
                .then(response => response.blob())
                .then(this.setSound) // set the blob as the sound
                .catch(e=>this.onFailure(e));
            }
        });
    };

}


const testRootEndpoint = () => {
    fetch(API_ROOT + "/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json' // necessary
        },
    })
    // .then(response => response.json())
    // .then(data => console.log(data))
    console.log('send test request')
}
