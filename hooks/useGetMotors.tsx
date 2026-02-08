import { getMotorsAction } from "@/app/actions/motors/getMotorsAction"
import { useState, useEffect } from "react"

export interface Motor {
    _id: string
    branch: string
    vehicle: {
        type: string
        model: string
        color: string
        vin: string
        engine: string
    }
    cost: number
    msrp: number
    waybill: string
    status: string
    createdAt: Date
    updatedAt: Date
}

export const useGetMotors = () => {
    const [motors, setMotors] = useState<Motor[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getMotors() {
            setLoading(true)
            try {
                const data = await getMotorsAction()
                setMotors(data)
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        getMotors()
    }, [])

    async function getBackMotors() {
        setLoading(true)
        try {
            const data = await getMotorsAction()
            setMotors(data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    return { motors, loading, error, getBackMotors }
}
