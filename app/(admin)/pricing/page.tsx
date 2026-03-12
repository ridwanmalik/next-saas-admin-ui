import { PlanCards } from "./_components/plan-cards"

const PricingPage = () => (
  <div className="space-y-8">
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Start for free, scale as you grow. No hidden fees, cancel anytime.
      </p>
    </div>
    <PlanCards />
  </div>
)

export default PricingPage
