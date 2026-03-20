import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_CATEGORIES } from "@/lib/faq-data"

const LandingFaqPage = () => (
  <div className="mx-auto w-full max-w-4xl space-y-12 pb-16">

    {/* Hero */}
    <section className="pt-6 text-center space-y-3">
      <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs">Help Center</Badge>
      <h1 className="text-4xl font-bold tracking-tight">Frequently asked questions</h1>
      <p className="mx-auto max-w-md text-muted-foreground">
        Can't find the answer you're looking for? Reach out to our support team — we're happy to help.
      </p>
      <div className="flex justify-center gap-3 pt-1">
        <Button asChild variant="outline" size="sm">
          <Link href="/landing/contact">Contact support</Link>
        </Button>
      </div>
    </section>

    {/* Category sections */}
    {FAQ_CATEGORIES.map(({ id, label, icon: Icon, items }) => (
      <section key={id} className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-semibold">{label}</h2>
        </div>
        <Accordion type="single" collapsible className="rounded-xl border bg-card divide-y overflow-hidden">
          {items.map(({ q, a }, i) => (
            <AccordionItem key={i} value={`${id}-${i}`} className="border-0 px-5">
              <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    ))}

    {/* CTA */}
    <section className="rounded-2xl border bg-muted/30 px-8 py-10 text-center space-y-3">
      <h2 className="text-xl font-semibold">Still have questions?</h2>
      <p className="text-sm text-muted-foreground mx-auto max-w-sm">
        Our support team is available Monday – Friday, 9 am – 6 pm GMT. We aim to respond within one business day.
      </p>
      <Button asChild className="mt-2">
        <Link href="/landing/contact">Get in touch</Link>
      </Button>
    </section>

  </div>
)

export default LandingFaqPage
