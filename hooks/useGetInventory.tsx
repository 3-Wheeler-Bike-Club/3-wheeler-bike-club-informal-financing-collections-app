import { getInventoryAction } from "@/app/actions/inventory/getInventoryAction"
import { useState, useEffect } from "react"

export interface Inventory {
    _id: string
    branch: "kasoa" | "kumasi"
    vehicle: {
        type: "motorcycle" | "tricycle"
        model: string
        color: string
        vin: string
    }
    amount: number
    status: "in stock" | "out of stock"
    createdAt: Date
    updatedAt: Date
}

export const useGetInventory = () => {
    const [inventory, setInventory] = useState<Inventory[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any | null>(null)

    useEffect(() => {
        async function getInventory() {
            setLoading(true)
            try {
                const data = await getInventoryAction()
                setInventory(data)
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        getInventory()
    }, [])

    async function getBackInventory() {
        setLoading(true)
        try {
            const data = await getInventoryAction()
            setInventory(data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }

    return { inventory, loading, error, getBackInventory }
}
