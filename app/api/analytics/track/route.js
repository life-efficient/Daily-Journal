import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/next-auth";
import Mixpanel from 'mixpanel';

export async function POST(req) {
    var mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

    const { event, properties} = await req.json();

    const session = await getServerSession(authOptions);

    const distinct_id = session.user.id // required name by mixpanel

    try {
        mixpanel.track(event, { distinct_id, ...properties})
        return NextResponse.json({ status: 200});
    } catch (e) {
        console.log(e)
        return NextResponse.json({ status: 500});
    }
}