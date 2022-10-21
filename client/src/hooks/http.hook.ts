import { useCallback, useState } from "react";

type methodType = 'GET' | 'POST'

export const useHttp = (baseUrl: string) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const request = useCallback(async (url:string, method: methodType = 'GET', body: any = null, headers:any = {}) => {
        setLoading(true)
        try{
            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(`${baseUrl}${url}`, {method, body, headers})
            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false)

            return data
        } catch (e) {
            let message
            if (e instanceof Error) message = e.message
            else message = String(error)
            setLoading(false)
            setError(message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null),[])

    return { loading, request, error, clearError }
}
