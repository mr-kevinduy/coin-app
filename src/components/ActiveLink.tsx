'use client'

import { PropsWithChildren, useState, useEffect } from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName?: string;
}

export default function ActiveLink({
  children,
  activeClassName='active',
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) {
  const pathname = usePathname()
  const [computedClassName, setComputedClassName] = useState(className)

  useEffect(() => {
    if (pathname) {
      let linkUrl = ''

      if (props.as) {
        linkUrl = props.as.toString()
      } else {
        linkUrl = props.href.toString()
      }

      const linkPathname = new URL(linkUrl, location.href).pathname
      const activePathname = new URL(pathname, location.href).pathname

      const newClassName =
        linkPathname === activePathname
          ? `${className} ${activeClassName}`.trim()
          : className

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName)
      }
    }

  }, [
    pathname,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ])

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  )
}
