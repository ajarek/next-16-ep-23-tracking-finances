"use client"
import { useCategoryLimitsStore } from "@/store/categoryLimits"
import { useTransactionRegister } from "@/store/transactionRegister"
import React from "react"
import { toast } from "sonner"

const Limit = () => {
  const { limit } = useCategoryLimitsStore()
  const { items } = useTransactionRegister()

  const { income, expenses } = React.useMemo(() => {
    return items
      .filter(
        (item) => new Date(item.date).getMonth() === new Date().getMonth(),
      )
      .reduce(
        (acc, curr) => {
          if (curr.type === "income") {
            acc.income += curr.amount
          } else {
            acc.expenses += curr.amount
          }
          return acc
        },
        { income: 0, expenses: 0 },
      )
  }, [items])

  const { rozrywka, zdrowie, oplaty, zakupy, restauracje, edukacja, inne } =
    limit
  if (limit.powiadomienia) {
    if (expenses > rozrywka) {
      toast.error("Przekroczono limit wydatków na rozrywkę", {
        classNames: {
          content: " text-primary",
        },
      })
    }
    if (expenses > zdrowie) {
      toast.error("Przekroczono limit wydatków na zdrowie", {
        classNames: {
          content: " text-primary",
        },
      })
    }
    if (expenses > oplaty) {
      toast.error("Przekroczono limit wydatków na opłaty", {
        classNames: {
          content: " text-primary",
        },
      })
    }
    if (expenses > zakupy) {
      toast.error("Przekroczono limit wydatków na zakupy", {
        classNames: {
          content: " text-primary",
        },
      })
    }
    if (expenses > restauracje) {
      toast.error("Przekroczono limit wydatków na restauracje", {
        classNames: {
          content: " text-primary",
        },
      })
    }
    if (expenses > edukacja) {
      toast.error("Przekroczono limit wydatków na edukację", {
        classNames: {
          content: " text-primary",
        },
      })
    }
    if (expenses > inne) {
      toast.error("Przekroczono limit wydatków na inne", {
        classNames: {
          content: " text-primary",
        },
      })
    }
  }
  return null
}

export default Limit
