import { getSalesAction } from "@/app/actions/sales/getSalesAction"
import { useState, useEffect } from "react"

export interface Sale {
    _id: string
    branch: "kasoa" | "kumasi"
    customer: {
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
        papers: string
    }
    amount: number
    createdAt: Date
    updatedAt: Date
}

export const useGetSales = () => {
    const [sales, setSales] = useState<Sale[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getSales() {
            setLoading(true)
            try {
                const data = await getSalesAction()
                setSales(data)
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        getSales()
    }, [])

    async function getBackSales() {
        setLoading(true)
        try {
            const data = await getSalesAction()
            setSales(data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    return { sales, loading, error, getBackSales }
}
