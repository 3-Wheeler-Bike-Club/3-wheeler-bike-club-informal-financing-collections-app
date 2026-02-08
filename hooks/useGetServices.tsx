import { getServicesAction } from "@/app/actions/services/getServicesAction"
import { useState, useEffect } from "react"

export interface Service {
    _id: string
    branch: string
    part: {
        type: string
        model: string
        no: string
        serial: string
    }
    customer: {
        firstname: string
        othername: string
        lastname: string
        phone: string
    }
    amount: number
    status: string
    createdAt: Date
    updatedAt: Date
}

export const useGetServices = () => {
    const [services, setServices] = useState<Service[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getServices() {
            setLoading(true)
            try {
                const data = await getServicesAction()
                setServices(data)
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        getServices()
    }, [])

    async function getBackServices() {
        setLoading(true)
        try {
            const data = await getServicesAction()
            setServices(data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    return { services, loading, error, getBackServices }
}
