'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  BookOpen,
  Boxes,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  LayoutDashboard,
  Library,
  MapPin,
  Menu,
  MoreHorizontal,
  PackageCheck,
  Radar,
  ScanLine,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Tags,
  Users,
  X,
} from 'lucide-react'

const books = [
  { id: 'BIO-0471', title: 'Campbell Biology', author: 'Urry, Cain & Wasserman', expected: 'B4 · Bay 3', current: 'D2 · Bay 1', confidence: 98, status: 'Misplaced', color: 'violet' },
  { id: 'PHY-0128', title: 'The Feynman Lectures', author: 'Richard P. Feynman', expected: 'C1 · Bay 2', current: 'C1 · Bay 2', confidence: 100, status: 'In place', color: 'blue' },
  { id: 'CHE-0834', title: 'Organic Chemistry', author: 'Paula Yurkanis Bruice', expected: 'D2 · Bay 1', current: 'D2 · Bay 1', confidence: 100, status: 'In place', color: 'amber' },
  { id: 'HIS-0302', title: 'A People’s History', author: 'Howard Zinn', expected: 'A3 · Bay 4', current: 'A3 · Bay 4', confidence: 97, status: 'In place', color: 'emerald' },
]

const bookTone: Record<string, string> = { violet: 'bg-violet-100 text-violet-700', blue: 'bg-blue-100 text-blue-700', amber: 'bg-amber-100 text-amber-700', emerald: 'bg-emerald-100 text-emerald-700' }

const zones = [
  { name: 'A · Humanities', count: '312', state: 'clear', bars: [44, 61, 53, 70, 82, 63, 76, 86, 69, 82] },
  { name: 'B · Life Sciences', count: '248', state: 'attention', bars: [46, 62, 56, 78, 72, 67, 89, 83, 61, 54] },
  { name: 'C · Physical Sciences', count: '186', state: 'clear', bars: [63, 72, 65, 75, 88, 77, 80, 70, 86, 91] },
  { name: 'D · Reference', count: '94', state: 'scan', bars: [30, 43, 38, 52, 45, 64, 55, 70, 61, 75] },
]

export default function Page() {
  const [query, setQuery] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const [selectedBook, setSelectedBook] = useState(books[0])
  const [toast, setToast] = useState('')
  const [filter, setFilter] = useState('All books')

  const filteredBooks = useMemo(() => books.filter((book) => {
    const matchesQuery = `${book.title} ${book.author} ${book.id}`.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'All books' || (filter === 'Needs attention' ? book.status === 'Misplaced' : book.status === 'In place')
    return matchesQuery && matchesFilter
  }), [query, filter])

  function showToast(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-[#182338]">
      {mobileNav && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" onClick={() => setMobileNav(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] -translate-x-full flex-col border-r border-slate-200 bg-white px-4 py-5 transition-transform lg:translate-x-0 ${mobileNav ? 'translate-x-0' : ''}`}>
        <div className="flex items-center gap-3 px-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#214e9b] text-white shadow-sm"><Radar /></div>
          <div><p className="text-[15px] font-bold tracking-tight">ShelfSense</p><p className="text-[10px] font-medium uppercase tracking-[0.17em] text-slate-400">Library intelligence</p></div>
          <button className="ml-auto lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close"><X /></button>
        </div>
        <div className="mt-9 flex flex-col gap-1">
          <NavItem icon={<LayoutDashboard />} label="Overview" active />
          <NavItem icon={<Search />} label="Find a book" />
          <NavItem icon={<ScanLine />} label="Scan a zone" badge="2" />
          <NavItem icon={<AlertTriangle />} label="Attention queue" />
        </div>
        <p className="mb-2 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
        <div className="flex flex-col gap-1"><NavItem icon={<BookOpen />} label="Collection" /><NavItem icon={<Users />} label="Team" /><NavItem icon={<Settings2 />} label="Settings" /></div>
        <div className="mt-auto rounded-2xl bg-[#edf4ff] p-4"><div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-white text-[#214e9b] shadow-sm"><Sparkles /></div><p className="text-xs font-semibold text-[#234379]">Tip for shelf readers</p><p className="mt-1 text-[11px] leading-4 text-[#6580aa]">Scan the shelf label first, then move left to right.</p></div>
      </aside>

      <section className="lg:pl-[248px]">
        <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur md:px-8">
          <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu /></button>
          <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex"><Library className="text-[#214e9b]" /><span>Northfield Academy</span><ChevronRight /><span className="font-semibold text-slate-700">Library operations</span></div>
          <div className="ml-auto flex items-center gap-3"><button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications"><Bell /><span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#e66e59] ring-2 ring-white" /></button><div className="hidden h-7 w-px bg-slate-200 sm:block" /><div className="flex items-center gap-2"><div className="flex size-8 items-center justify-center rounded-full bg-[#dce9ff] text-xs font-bold text-[#214e9b]">JM</div><span className="hidden text-sm font-medium text-slate-700 sm:block">Jamie Morgan</span><ChevronRight className="rotate-90 text-slate-400" /></div></div>
        </header>

        <div className="mx-auto max-w-[1440px] px-5 py-7 md:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#4d73b0]">Monday, 14 October 2024</p><h1 className="text-[29px] font-bold tracking-[-0.03em] text-[#152541]">Good morning, Jamie.</h1><p className="mt-1.5 text-sm text-slate-500">Here&apos;s what&apos;s happening across your library today.</p></div><button onClick={() => showToast('Shelf scan started for Zone B')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#214e9b] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(33,78,155,0.2)] transition hover:bg-[#183e81]"><ScanLine /> Start shelf scan</button></div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={<BookOpen />} label="Total collection" value="2,840" detail="books tracked" tone="blue" /><Metric icon={<MapPin />} label="Located today" value="2,718" detail="95.7% confidence" tone="green" /><Metric icon={<AlertTriangle />} label="Needs attention" value="12" detail="3 new this week" tone="orange" /><Metric icon={<Clock3 />} label="Time saved" value="8.4 hrs" detail="vs. manual reading" tone="purple" /></div>

          <div className="mt-7 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(34,58,98,0.04)] md:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><div className="flex items-center gap-2"><h2 className="text-base font-bold text-[#1b2e4c]">Find a book</h2><span className="rounded-full bg-[#e8f0ff] px-2 py-0.5 text-[10px] font-bold text-[#3764a5]">LIVE LOCATION</span></div><p className="mt-1 text-xs text-slate-500">Search by title, author, ISBN, or shelf ID.</p></div><button className="flex items-center gap-1 text-xs font-semibold text-[#3764a5]">Advanced search <ArrowUpRight /></button></div><div className="relative mt-5"><Search className="absolute left-3.5 top-3.5 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “Campbell Biology” or BIO-0471" className="h-11 w-full rounded-xl border border-slate-200 bg-[#fafbfd] pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#6b91cf] focus:ring-4 focus:ring-[#e8f0ff]" /></div><div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1"><FilterButton active={filter === 'All books'} onClick={() => setFilter('All books')}>All books <span>2,840</span></FilterButton><FilterButton active={filter === 'Needs attention'} onClick={() => setFilter('Needs attention')}>Needs attention <span>12</span></FilterButton><FilterButton active={filter === 'In place'} onClick={() => setFilter('In place')}>In place</FilterButton><button className="ml-auto hidden shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 sm:flex"><SlidersHorizontal /> Filter</button></div><div className="mt-3 overflow-x-auto"><table className="w-full min-w-[620px] text-left"><thead><tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400"><th className="pb-3 pl-2">Book</th><th className="pb-3">Expected shelf</th><th className="pb-3">Last seen</th><th className="pb-3">Status</th><th className="pb-3" /></tr></thead><tbody>{filteredBooks.map((book) => <tr key={book.id} onClick={() => setSelectedBook(book)} className={`cursor-pointer border-b border-slate-100 text-sm transition hover:bg-[#f8fbff] ${selectedBook.id === book.id ? 'bg-[#f8fbff]' : ''}`}><td className="py-3 pl-2"><div className="flex items-center gap-3"><div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${bookTone[book.color]}`}><Tags /></div><div><p className="font-semibold text-[#253b5e]">{book.title}</p><p className="text-[11px] text-slate-400">{book.id} · {book.author}</p></div></div></td><td className="font-medium text-slate-600">{book.expected}</td><td className="text-slate-500">{book.current}</td><td><Status status={book.status} /></td><td><MoreHorizontal className="text-slate-400" /></td></tr>)}</tbody></table></div></section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(34,58,98,0.04)] md:p-6"><div className="flex items-start justify-between"><div><h2 className="text-base font-bold text-[#1b2e4c]">Selected book</h2><p className="mt-1 text-xs text-slate-500">Tap a result to see its location signal.</p></div><div className="flex size-9 items-center justify-center rounded-xl bg-[#fff0ea] text-[#d4664f]"><MapPin /></div></div><div className="mt-5 rounded-2xl bg-[#f7f9fc] p-4"><div className="flex gap-3"><div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#ebe4ff] text-[#7254c9]"><BookOpen /></div><div><h3 className="font-bold text-[#243858]">{selectedBook.title}</h3><p className="mt-0.5 text-xs text-slate-500">{selectedBook.author}</p><p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">Asset ID · {selectedBook.id}</p></div></div></div><div className="mt-5 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">Current signal</p><p className="mt-1 text-lg font-bold text-[#d4664f]">{selectedBook.current}</p></div><div className="text-right"><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">Confidence</p><p className="mt-1 text-lg font-bold text-[#243858]">{selectedBook.confidence}%</p></div></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#e68b70]" style={{ width: `${selectedBook.confidence}%` }} /></div>{selectedBook.status === 'Misplaced' ? <div className="mt-5 rounded-xl border border-[#f7d6cb] bg-[#fff7f4] p-3.5"><div className="flex gap-2"><AlertTriangle className="shrink-0 text-[#db725a]" /><div><p className="text-xs font-bold text-[#a9523f]">Likely misplaced</p><p className="mt-1 text-xs leading-5 text-[#a76a5d]">Expected at <b>{selectedBook.expected}</b>. Signal detected at <b>{selectedBook.current}</b>.</p></div></div></div> : <div className="mt-5 rounded-xl border border-[#cde9db] bg-[#f1fbf5] p-3.5"><div className="flex gap-2"><Check className="shrink-0 text-[#2c9361]" /><div><p className="text-xs font-bold text-[#26764f]">Book is in place</p><p className="mt-1 text-xs leading-5 text-[#5e9878]">The current signal matches the catalogue location.</p></div></div></div>}<button onClick={() => showToast(`Directions opened for ${selectedBook.title}`)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-[#365d99] transition hover:bg-slate-50"><MapPin /> Show me the route <ArrowUpRight /></button></section>
          </div>

          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(34,58,98,0.04)] md:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><div className="flex items-center gap-2"><h2 className="text-base font-bold text-[#1b2e4c]">Shelf health</h2><span className="rounded-full bg-[#eaf8f0] px-2 py-0.5 text-[10px] font-bold text-[#328460]">92% healthy</span></div><p className="mt-1 text-xs text-slate-500">A quick view of signal coverage by library zone.</p></div><button className="flex items-center gap-1 text-xs font-semibold text-[#3764a5]">View full report <ArrowUpRight /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{zones.map((zone) => <div key={zone.name} className="rounded-xl border border-slate-100 bg-[#fbfcfe] p-4"><div className="flex items-start justify-between"><div><p className="text-xs font-bold text-[#293d5b]">{zone.name}</p><p className="mt-1 text-[11px] text-slate-400">{zone.count} books</p></div><div className={`rounded-full p-1.5 ${zone.state === 'attention' ? 'bg-[#fff0ea] text-[#dc7058]' : zone.state === 'scan' ? 'bg-[#fff7db] text-[#b68b23]' : 'bg-[#eaf8f0] text-[#328460]'}`}>{zone.state === 'attention' ? <AlertTriangle /> : zone.state === 'scan' ? <ScanLine /> : <Check />}</div></div><div className="mt-5 flex h-8 items-end gap-1">{zone.bars.map((bar, i) => <div key={i} className={`flex-1 rounded-t-sm ${zone.state === 'attention' ? 'bg-[#e6a08b]' : zone.state === 'scan' ? 'bg-[#e8ca72]' : 'bg-[#8dc9a9]'}`} style={{ height: `${bar}%` }} />)}</div><div className="mt-3 flex items-center justify-between text-[10px] font-semibold"><span className={zone.state === 'attention' ? 'text-[#d0715c]' : zone.state === 'scan' ? 'text-[#ad8420]' : 'text-[#4d9b72]'}>{zone.state === 'clear' ? 'No issues found' : zone.state === 'scan' ? 'Scan scheduled' : '3 items to review'}</span><span className="text-slate-400">Today</span></div></div>)}</div></section>
        </div>
      </section>
      {toast && <div role="status" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#1d2d48] px-4 py-3 text-sm font-semibold text-white shadow-xl"><Check />{toast}</div>}
    </main>
  )
}

function NavItem({ icon, label, active, badge }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string }) { return <button className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${active ? 'bg-[#edf4ff] text-[#214e9b]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>{icon}<span className="flex-1">{label}</span>{badge && <span className="rounded-full bg-[#fff0ea] px-1.5 py-0.5 text-[10px] font-bold text-[#d4664f]">{badge}</span>}</button> }
function Metric({ icon, label, value, detail, tone }: { icon: React.ReactNode; label: string; value: string; detail: string; tone: string }) { const styles: Record<string, string> = { blue: 'bg-[#eaf1ff] text-[#3764a5]', green: 'bg-[#eaf8f0] text-[#328460]', orange: 'bg-[#fff0ea] text-[#d4664f]', purple: 'bg-[#f0ebff] text-[#7254c9]' }; return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(34,58,98,0.04)]"><div className="flex items-start justify-between"><div><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 text-[25px] font-bold tracking-tight text-[#1d314f]">{value}</p></div><div className={`flex size-9 items-center justify-center rounded-xl ${styles[tone]}`}>{icon}</div></div><p className="mt-3 text-[11px] font-medium text-slate-400">{detail}</p></div> }
function Status({ status }: { status: string }) { return <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold ${status === 'Misplaced' ? 'bg-[#fff0ea] text-[#c7604b]' : 'bg-[#eaf8f0] text-[#328460]'}`}><span className="size-1.5 rounded-full bg-current" />{status}</span> }
function FilterButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) { return <button onClick={onClick} className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${active ? 'bg-[#eaf1ff] text-[#3764a5]' : 'text-slate-500 hover:bg-slate-100'}`}>{children}</button> }
