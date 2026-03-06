"use client"

import ShowCard from "../_components/show-card"

const TypographyPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
      <p className="text-muted-foreground">Styles for headings, paragraphs, lists...etc</p>
    </div>
    <div className="space-y-4">
      <ShowCard title="h1">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Taxing Laughter: The Joke Tax Chronicles
        </h1>
      </ShowCard>

      <ShowCard title="h2">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          The People of the Kingdom
        </h2>
      </ShowCard>

      <ShowCard title="h3">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          The Joke Tax
        </h3>
      </ShowCard>

      <ShowCard title="h4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          People stopped telling jokes
        </h4>
      </ShowCard>

      <ShowCard title="p">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The king, seeing how much happier his subjects were, realized the error of
          his ways and repealed the joke tax.
        </p>
      </ShowCard>

      <ShowCard title="blockquote">
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
          it&apos;s only fair that they should pay for the privilege.&quot;
        </blockquote>
      </ShowCard>

      <ShowCard title="table">
        <div className="my-6 w-full overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  King&apos;s Treasury
                </th>
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  People&apos;s happiness
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Empty</td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Overflowing</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Modest</td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Satisfied</td>
              </tr>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Full</td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">Ecstatic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowCard>

      <ShowCard title="list">
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners : 20 gold coins</li>
        </ul>
      </ShowCard>

      <ShowCard title="Inline code">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          @radix-ui/react-alert-dialog
        </code>
      </ShowCard>

      <ShowCard title="Lead">
        <p className="text-xl text-muted-foreground">
          A modal dialog that interrupts the user with important content and expects
          a response.
        </p>
      </ShowCard>

      <ShowCard title="Large">
        <div className="text-lg font-semibold">Are you absolutely sure?</div>
      </ShowCard>

      <ShowCard title="Small">
        <small className="text-sm leading-none font-medium">Email address</small>
      </ShowCard>

      <ShowCard title="Muted">
        <p className="text-sm text-muted-foreground">Enter your email address.</p>
      </ShowCard>
    </div>
  </div>
)

export default TypographyPage
