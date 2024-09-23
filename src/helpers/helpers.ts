export const apiUrl = (endpoint: string): string => {
    const baseUrl = process.env.REACT_APP_API_URL;

    if (!baseUrl) {
        throw new Error('REACT_APP_API_URL is not defined');
    }

    return `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
};
