import apiClient from "@/utils/api"

const track = (event, properties) => {
    const payload = JSON.stringify({
        "event": event,
        "properties": properties
    })
    console.log(payload)
    return apiClient.post("/analytics/track", payload);
}

const identify = (properties) => {
    return apiClient.post("/analytics/identify", properties);
}

export { track, identify }