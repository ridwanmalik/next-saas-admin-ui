"use client"

import ShowCard from "../_components/show-card"

const TypographyPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
      <p className="text-muted-foreground">Styles for headings, paragraphs, lists, and inline elements.</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="Headings">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Heading 1</h1>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Heading 2</h2>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Heading 3</h3>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Heading 4</h4>
        </div>
      </ShowCard>
      <ShowCard title="Paragraph & Lead">
        <div className="flex flex-col gap-3 max-w-prose">
          <p className="text-xl text-muted-foreground">A lead paragraph introduces the main content with a slightly larger, muted style.</p>
          <p className="leading-7">The king, seeing how much happier his subjects were, realised the tax was causing unnecessary burden. He rescinded the joke tax, and all was well again.</p>
        </div>
      </ShowCard>
      <ShowCard title="Blockquote & Inline">
        <div className="flex flex-col gap-4 max-w-prose">
          <blockquote className="mt-6 border-l-2 pl-6 italic">"After all, the best way to predict the future is to create it."</blockquote>
          <p className="leading-7">Use the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">shadcn add</code> command to install components.</p>
        </div>
      </ShowCard>
      <ShowCard title="List">
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners: 20 gold coins</li>
        </ul>
      </ShowCard>
      <ShowCard title="Large / Small / Muted">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Large — Are you absolutely sure?</p>
          <p className="text-sm font-medium leading-none">Small — Email address</p>
          <p className="text-sm text-muted-foreground">Muted — Enter your email address.</p>
        </div>
      </ShowCard>
    </div>
  </div>
)

export default TypographyPage
