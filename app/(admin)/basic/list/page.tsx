const Section = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="rounded-xl border bg-card p-6">{children}</div>
  </div>
)

const FEATURES = ["Real-time collaboration", "Advanced analytics", "Custom integrations", "Priority support", "Audit logs", "SSO / SAML"]
const STEPS = ["Create your account and verify your email", "Set up your workspace and invite your team", "Connect your data sources via the integrations panel", "Configure your dashboard and set up alerts", "Go live and start monitoring in real time"]
const TERMS = [
  { term: "API",         def: "Application Programming Interface — a way for two applications to communicate." },
  { term: "SSO",         def: "Single Sign-On — lets users access multiple apps with one set of credentials." },
  { term: "SLA",         def: "Service Level Agreement — a commitment to a defined level of service uptime." },
  { term: "Webhook",     def: "An HTTP callback that sends real-time data to a URL when an event occurs." },
]

const ListPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">List</h2>
      <p className="text-muted-foreground">Unordered, ordered, definition, and custom list styles.</p>
    </div>

    <Section title="Unordered list" description="Bullet list using standard disc markers.">
      <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
        {FEATURES.map(f => <li key={f}>{f}</li>)}
      </ul>
    </Section>

    <Section title="Ordered list" description="Numbered steps for sequential content.">
      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
        {STEPS.map(s => <li key={s}>{s}</li>)}
      </ol>
    </Section>

    <Section title="Nested list" description="Multi-level list for hierarchical content.">
      <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
        <li>Account
          <ul className="list-[circle] list-inside ml-5 mt-1 space-y-1">
            <li>Profile settings</li>
            <li>Password & security</li>
            <li>Notifications</li>
          </ul>
        </li>
        <li>Workspace
          <ul className="list-[circle] list-inside ml-5 mt-1 space-y-1">
            <li>Members & roles</li>
            <li>Billing & plans</li>
          </ul>
        </li>
        <li>Integrations
          <ul className="list-[circle] list-inside ml-5 mt-1 space-y-1">
            <li>Connected apps</li>
            <li>Webhooks</li>
            <li>API keys</li>
          </ul>
        </li>
      </ul>
    </Section>

    <Section title="Custom bullet list" description="Icon-based list items for feature highlights.">
      <ul className="space-y-2.5">
        {FEATURES.map(f => (
          <li key={f} className="flex items-center gap-2.5 text-sm">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">✓</span>
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section title="Definition list" description="Term–definition pairs using dl, dt, dd.">
      <dl className="space-y-4">
        {TERMS.map(({ term, def }) => (
          <div key={term} className="grid grid-cols-[120px_1fr] gap-3 text-sm">
            <dt className="font-semibold pt-0.5">{term}</dt>
            <dd className="text-muted-foreground leading-relaxed">{def}</dd>
          </div>
        ))}
      </dl>
    </Section>

    <Section title="Inline list" description="Horizontal list for tags, breadcrumbs, or metadata.">
      <ul className="flex flex-wrap gap-2 text-sm text-muted-foreground">
        {["Design", "Engineering", "Product", "Marketing", "Sales", "Support"].map(tag => (
          <li key={tag} className="rounded-full border px-3 py-1 text-xs">{tag}</li>
        ))}
      </ul>
    </Section>

    <Section title="Bordered list" description="Divided rows — useful for settings or menu lists.">
      <ul className="divide-y text-sm">
        {[
          { label: "Email notifications",   sub: "Receive updates via email" },
          { label: "Push notifications",     sub: "Get alerts on your device"  },
          { label: "Weekly digest",          sub: "A summary every Monday"     },
          { label: "Product announcements",  sub: "New features and updates"   },
        ].map(({ label, sub }) => (
          <li key={label} className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  </div>
)

export default ListPage
