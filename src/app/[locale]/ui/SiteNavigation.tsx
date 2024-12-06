import ActiveLink from '@/components/ActiveLink'

export default function SiteNavigation() {
  return (
    <nav>
      <ul className="site-navigation navigation row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <li className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          <ActiveLink className="nav-link" href="/">Home</ActiveLink>
        </li>

        <li className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          <ActiveLink className="nav-link" href="/estimate">Finance Estimate</ActiveLink>
        </li>

        <li className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          <ActiveLink className="nav-link" href="/about">About us</ActiveLink>
        </li>
      </ul>
    </nav>
  )
}
