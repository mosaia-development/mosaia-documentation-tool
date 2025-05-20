import toolCall from "./tool-call";

type RawEvent = {
    body: string;
}

type ParsedEvent = {
    args: Record<string, string>;
    secrets: Record<string, string>;
}

export async function handler(event: RawEvent) {
    const {
        args: {
            query
        },
        secrets: {
            GITBOOK_API_KEY,
            GITBOOK_SPACE_ID
        }
    } = JSON.parse(event.body) as ParsedEvent;

    try {
        const result = await toolCall(query, GITBOOK_API_KEY, GITBOOK_SPACE_ID);

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error: unknown) {
        let message = '';

        if (error instanceof Error) {
            message = error.message;
        } else {
            message = 'Unknown error';
        }

        return {
            statusCode: 500,
            body: JSON.stringify(message),
        };
    }
}
