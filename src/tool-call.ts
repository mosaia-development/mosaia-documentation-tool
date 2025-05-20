export default async function toolCall(query: string, gitbookApiKey: string, gitbookSpaceId: string): Promise<string> {
    try {
        const apiUrl = `https://api.gitbook.com/v1/spaces/${gitbookSpaceId}/search?query=${query}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${gitbookApiKey}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        return JSON.stringify(data);
    } catch (error) {
        console.error('Error making API request:', error);
        throw error;
    }
}
