"use client"
import { useRouter } from "next/navigation"
import React from "react"

interface PricingCardsProps {

  isSubscribed: boolean
}

const PricingCards: React.FC<PricingCardsProps> = ({

  isSubscribed,

}) => {
  const router = useRouter()
  
  // PASTE YOUR ACTUAL STRIPE TEST PRICE ID HERE
  const LIVE_STRIPE_PRICE_ID = "price_1TmoNj5rLJX5AeyxxCEHMuih" 

  const handleSubscribe = async () => {
    if (isSubscribed) {
      alert("You already have an active subscription! Visiting dashboard...")
      return
    }
    
    try {
      const response = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId: LIVE_STRIPE_PRICE_ID }),
      })

      const { url, error } = await response.json()

      if (error) throw new Error(error)

      if (url) {
        window.location.assign(url)
      } else {
        throw new Error("No checkout url returned")
      }
    } catch (error) {
      console.error("Error creating checkout session: ", error)
      alert("Error creating checkout session. Check terminal logs.")
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100 flex flex-col justify-between hover:border border-indigo-300 transition-colors">
      <div>
        <h2 className="text-2xl font-bold mb-2">Premium Access</h2>
        <p className="text-gray-500 mb-6">Get complete access to all V1 features.</p>
        <p className="text-4xl font-extrabold mb-6">$10<span className="text-base font-normal text-gray-500">/mo</span></p>
        
        <ul className="mb-8 space-y-3 text-gray-600">
          <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Full Platform Access</li>
          <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Core V1 Features</li>
          <li className="flex items-center"><span className="text-green-500 mr-2">✔</span> Continuous Updates</li>
        </ul>
      </div>

      <button
        onClick={handleSubscribe}
        disabled={isSubscribed}
        className="w-full px-4 py-3 rounded-lg font-semibold transition-colors bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {isSubscribed ? "Manage Subscription" : "Subscribe Now"}
      </button>
    </div>
  )
}

export default PricingCards