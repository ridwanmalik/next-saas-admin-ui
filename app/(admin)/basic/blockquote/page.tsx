const Section = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="rounded-xl border bg-card p-6 space-y-5">{children}</div>
  </div>
)

const BlockquotePage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Blockquote & Code</h2>
      <p className="text-muted-foreground">Quote styles, callouts, and code block patterns.</p>
    </div>

    <Section title="Blockquote styles" description="Various ways to present quoted content.">
      {/* Left border */}
      <blockquote className="border-l-4 border-primary pl-4">
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          "The best way to predict the future is to invent it. Great teams don't just react to
          change — they create the conditions for the change they want to see."
        </p>
        <footer className="mt-2 text-xs text-muted-foreground">— Alan Kay</footer>
      </blockquote>

      {/* Soft card */}
      <blockquote className="rounded-xl bg-muted/50 px-5 py-4">
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          "Simplicity is the ultimate sophistication. Every feature you don't build is a feature
          you don't have to maintain, document, or explain to your users."
        </p>
        <footer className="mt-2 text-xs text-muted-foreground">— Leonardo da Vinci (adapted)</footer>
      </blockquote>

      {/* Large quote mark */}
      <blockquote className="relative pl-8">
        <span className="absolute left-0 top-0 text-5xl font-serif leading-none text-primary/30 select-none">&ldquo;</span>
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          "Move fast with stable infrastructure. Speed matters, but not at the cost of reliability.
          The teams that ship the most aren't reckless — they're just really, really well-practiced."
        </p>
        <footer className="mt-2 text-xs text-muted-foreground">— Unknown</footer>
      </blockquote>
    </Section>

    <Section title="Callout blocks" description="Highlighted boxes for tips, warnings, and notices.">
      {[
        { type: "Info",    color: "border-blue-500/30 bg-blue-500/5",    text: "text-blue-700 dark:text-blue-300",    icon: "ℹ",  msg: "This feature is currently in beta. Behaviour may change before the stable release." },
        { type: "Tip",     color: "border-emerald-500/30 bg-emerald-500/5", text: "text-emerald-700 dark:text-emerald-300", icon: "✦", msg: "You can press Cmd+K anywhere to open the command palette and jump to any page instantly." },
        { type: "Warning", color: "border-amber-500/30 bg-amber-500/5",   text: "text-amber-700 dark:text-amber-300",    icon: "⚠",  msg: "Deleting a workspace is permanent. All data, members, and integrations will be removed." },
        { type: "Danger",  color: "border-red-500/30 bg-red-500/5",       text: "text-red-700 dark:text-red-300",        icon: "✕",  msg: "Your account is over the rate limit. Requests will be rejected until the next billing cycle." },
      ].map(({ type, color, text, icon, msg }) => (
        <div key={type} className={`rounded-lg border px-4 py-3 flex gap-3 ${color}`}>
          <span className={`text-base leading-none mt-0.5 ${text}`}>{icon}</span>
          <div>
            <p className={`text-xs font-semibold mb-0.5 ${text}`}>{type}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{msg}</p>
          </div>
        </div>
      ))}
    </Section>

    <Section title="Inline code" description="Code within prose content.">
      <p className="text-sm text-muted-foreground leading-relaxed">
        To install dependencies, run{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">yarn install</code>.
        Then start the dev server with{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">yarn dev</code>.
        The app will be available at{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">http://localhost:3000</code>.
      </p>
    </Section>

    <Section title="Code blocks" description="Multi-line code with syntax hints.">
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Installation</p>
          <pre className="rounded-xl bg-muted px-4 py-4 text-xs font-mono overflow-x-auto leading-relaxed text-foreground">
{`# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build`}
          </pre>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">TypeScript</p>
          <pre className="rounded-xl bg-muted px-4 py-4 text-xs font-mono overflow-x-auto leading-relaxed text-foreground">
{`interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
}

const getUser = async (id: string): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`)
  return res.json()
}`}
          </pre>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Shell output</p>
          <pre className="rounded-xl bg-neutral-900 dark:bg-neutral-950 px-4 py-4 text-xs font-mono overflow-x-auto leading-relaxed text-neutral-100">
{`$ yarn build
  ▲ Next.js 15.0.0

   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types
 ✓ Collecting page data
 ✓ Generating static pages (42/42)

Route (app)                     Size    First Load JS
┌ ○ /dashboard                  5.2 kB        98.3 kB
├ ○ /users                      8.1 kB       101.2 kB
└ ○ /settings                   3.8 kB        96.9 kB`}
          </pre>
        </div>
      </div>
    </Section>
  </div>
)

export default BlockquotePage
