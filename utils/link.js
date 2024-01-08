import config from "@/config";

export const getChatPageURL = (sysMsg, imgURL, voice) => {
    const urlBase = window.location.origin; 
    const urlToCopy = urlBase + `/${config.appName}/chat?sysMsg=${encodeURIComponent(sysMsg)}&voice=${encodeURIComponent(voice)}&img=${encodeURIComponent(imgURL)}`;
    return urlToCopy;
}