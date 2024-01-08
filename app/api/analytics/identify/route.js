import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/next-auth";
import Mixpanel from 'mixpanel';

export async function POST(req) {
    var mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

    const body = await req.json();

    const session = await getServerSession(authOptions);

    const userId = session.user.id

    const mp_special_properties = ["email", "phone"]
    for (const prop in mp_special_properties) {
        if (prop in body) {
            body["$"+prop] = body[prop]
            delete body[prop]
        }
    }

    // const auth_properties = {"family_name": "$first_name", "given_name": "$last_name"}
    // for (const prop in auth_properties) {
    //     if (prop in body) {
    //         body[auth_properties[prop]] = body[prop]
    //         delete body[prop]
    //     }
    // }

    try {
        mixpanel.people.set(userId, body)
        return NextResponse.json({ status: 200});
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ status: 500});
    }
}

    // mp_special_properties = ["email", "phone"]
    // for prop in mp_special_properties:
    //     if prop in properties:
    //         properties["$"+prop] = properties[prop]
    //         del properties[prop]

    // auth_properties = {"family_name": "$first_name", "given_name": "$last_name"}
    // for prop in auth_properties:
    //     if prop in properties:
    //         properties[auth_properties[prop]] = properties[prop]
    //         del properties[prop]

    // mp.people_set(user_id, properties)