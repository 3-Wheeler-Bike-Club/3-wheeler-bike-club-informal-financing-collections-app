import { getSparesAction } from "@/app/actions/spares/getSparesAction"
import { useState, useEffect } from "react"

export interface Spare {
    _id: string
    branch: string
    part: {
        type: string
        model: string
        no: string
        serial: string
    }
    cost: number
    msrp: number
    waybill: string
    status: string
    createdAt: Date
    updatedAt: Date
}

export const useGetSpares = () => {
    const [spares, setSpares] = useState<Spare[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getSpares() {
            setLoading(true)
            try {
                const data = await getSparesAction()
                setSpares(data)
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        getSpares()
    }, [])

    async function getBackSpares() {
        setLoading(true)
        try {
            const data = await getSparesAction()
            setSpares(data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    return { spares, loading, error, getBackSpares }
}
