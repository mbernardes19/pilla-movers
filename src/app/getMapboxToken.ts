'use server'

export const getMapboxToken = async () => {
    if (!process.env.MAPBOX_TOKEN) {
        throw new Error('Mapbox environment variable not set')
    }
    return process.env.MAPBOX_TOKEN
}