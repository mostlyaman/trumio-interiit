from openai import OpenAI
import json
import os
from ..api.models import Transcript, Project

api_key = os.environ.get("OPENAI_API_KEY")

if api_key:
    print("\n\n\n API KEY FOUND \n\n\n", api_key)
    client = OpenAI(api_key=api_key)
else:
    # raise Exception("OPENAI_API_KEY not found in environment variables")
    client = OpenAI(api_key="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")


def create_prompt(project: Project):
    prompt = f""" You have given a context of a project as follows: \n
    
    Project Name: {project.name} \n
    Project Description: {project.description} \n
    Project Duration: {project.expected_duration} \n
    Project Listing Duration: {project.listing_duration} \n

    Project Team: \n
    """

    for member in project.team.members:
        prompt += f"Name: {member.name}, Role: {member.role} \n"

    prompt += """ \n
    Project Milestones: \n
    """

    for milestone in project.milestones:
        prompt += f"Name: {milestone.name}, Description: {milestone.description}, Duration: {milestone.duration} \n"

    prompt += """ \n
    Project Skills Required: \n
    """

    if project.skills_required:
        for skill in project.skills_required:
            prompt += f"{skill}"
        prompt += "\n"
    prompt += """ \n
    Project Tools Required: \n
    """

    if project.tools_required:
        for tool in project.tools_required:
            prompt += f"{tool} \n"

    prompt += """ \n
    Project Meeting Transcripts: \n
    """

    if project.meeting_transcripts:
        for transcript in project.meeting_transcripts:
            prompt += f"Timestamp: {transcript.timestamp} \n"

            prompt += """ \n
            Meeting Members: \n
            """

            for member in transcript.members:
                prompt += f"Name: {member.name}, Role: {member.role} \n"

            prompt += """ \n
            Transcript Summary: \n
            """

            for chapter in transcript.trancriptSummary.chapters:
                prompt += (
                    f"Title: {chapter.title}, Description: {chapter.description} \n"
                )

    prompt += """ \n
    You have given a meeting transcription. You have to break it into chapters and give a list of chapters with title and detailed description(Try to include as much information as posible in description). You can use the following format to return the chapters as json. \n
    {
        'Chapters': [
            {
                'Title': '<Chapter Name>',
                'Details': '<Pointwise Description of everything discussed in this chapter>',
            },
            {
                'Title': '<Chapter Name>',
                'Details': '<Pointwise Description of everything discussed in this chapter>',
            },
        ],
        'error': False
    }
    """

    return prompt


async def get_chapters_from_transcription(transcription: Transcript, prompt: str):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-16k",
            messages=[
                {
                    "role": "system",
                    "content": prompt,
                },
                {"role": "user", "content": f"{transcription}"},
            ],
        )
        # return {"text": str(response.choices[0].message.content)}
        if response.choices[0].message.content:
            response_json = json.loads(response.choices[0].message.content)
            # print(response_json)
            return response_json

    except Exception as e:
        return {"status": "Internal Server Error 500", "message": str(e), "error": True}
