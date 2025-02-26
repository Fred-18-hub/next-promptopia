import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const creatorId = (await params).id;

    const prompts = await Prompt.find({ creator: creatorId }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      `Failed to fetch all prompts for userId: ${params.id}`,
      { status: 500 }
    );
  }
};
