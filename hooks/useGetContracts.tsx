import { getContractsAction } from "@/app/actions/contracts/getContractsAction"
import { useState, useEffect } from "react"

export interface Contract {
    _id: string
    branch: "kasoa" | "kumasi"
    owner: {
        firstname: number
        othername: number
        lastname: string
        phone: string
    }
    vehicle: {
        type: "motorcycle" | "tricycle"
        model: string
        year: string
        color: string
        vin: string
        license: string
    }
    driver?: {
        firstname: string
        othername: string
        lastname: string
        phone: string
        location: string
        national: string
    }
    guarantor?: {
        firstname: string
        othername: string
        lastname: string
        phone: string
        national: string
    }
    deposit: number
    start: Date
    end: Date
    duration: number
    amount: number
    installment: number
    payments?: Array<{
        week: number
        amount: number
        method: "momo" | "cash"
        reference: Date
        status: "full" | "partial"
    }>
    status: "pending" | "active" | "defaulted" | "completed"
    createdAt: Date
    updatedAt: Date
}

export const useGetContracts = () => {
    const [contracts, setContracts] = useState<Contract[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getContracts() {
            setLoading(true)
            try {
                const data = await getContractsAction()
                setContracts(data)
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        getContracts()
    }, [])

    async function getBackContracts() {
        setLoading(true)
        try {
            const data = await getContractsAction()
            setContracts(data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    return { contracts, loading, error, getBackContracts }
}
