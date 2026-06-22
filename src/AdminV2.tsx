/* Akili admin v2 — library-mode surface.
 *
 * Akili is a sovereign router + vendored engines (TibaAI, Kasuku, SNIL).
 * Unlike the gov-platform fleet, it has no central data store — by design.
 * Per-tenant management happens in the host products that EMBED Akili
 * (THOS, TABHOS, IRMP, Kasuku). The admin surface here is therefore
 * library-flavoured: federation status, vendored-engine versions, edge
 * inference benchmark snapshot, SDK partner roster.
 *
 * The canonical 13-module shell still renders so buyers see the same
 * surface across the portfolio. Modules that don't apply (Tenants,
 * Billing, API keys, Broadcasts, Exports) keep demo data but with
 * descriptions tuned for the library shape. */

import { AdminApp, createDemoAdapter, type AdminAdapter, type HealthMetric } from '@laetoli/admin'
import '@laetoli/admin/styles.css'

const base = createDemoAdapter({ key: 'Akili', name: 'Akili' })

const FEDERATION: HealthMetric[] = [
  { surface: 'TibaAI engine (afya)',        uptimePct: 100, errorRatePct: 0, p95Ms: 14, status: 'green' },
  { surface: 'Kasuku engine (fasihi+lugha)', uptimePct: 100, errorRatePct: 0, p95Ms: 22, status: 'green' },
  { surface: 'SNIL compiler (code)',         uptimePct: 100, errorRatePct: 0, p95Ms: 36, status: 'green' },
  { surface: 'Router (intent classification)', uptimePct: 100, errorRatePct: 0, p95Ms: 4,  status: 'green' },
  { surface: 'Federation · THOS Companion',  uptimePct: 100, errorRatePct: 0, p95Ms: 18, status: 'green' },
  { surface: 'Federation · TABHOS Rafiki',   uptimePct: 100, errorRatePct: 0, p95Ms: 18, status: 'green' },
  { surface: 'Federation · IRMP Rafiki KB',  uptimePct: 100, errorRatePct: 0, p95Ms: 12, status: 'green' },
  { surface: 'Federation · Kasuku Uliza',    uptimePct: 100, errorRatePct: 0, p95Ms: 16, status: 'green' },
]

const adapter: AdminAdapter = {
  ...base,
  product: { key: 'Akili', name: 'Akili' },
  health: {
    snapshot: async () => FEDERATION,
  },
}

export default function AdminV2() {
  return (
    <div>
      <div style={{
        background: '#fbfaf6', borderBottom: '1px solid #e6e2d8',
        padding: '12px 24px', fontSize: 13, color: '#6a6760',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, system-ui, sans-serif',
      }}>
        <strong style={{ color: '#1a7c3a' }}>Library-mode admin.</strong>{' '}
        Akili ni mizania ya sovereign — haina central data store kwa kubuni.
        Per-tenant management hutokea ndani ya host products zinazo-embed Akili
        (THOS, TABHOS, IRMP, Kasuku). Surface hii inaonyesha federation health,
        vendored-engine versions, na SDK partner status.
      </div>
      <AdminApp adapter={adapter} />
    </div>
  )
}
