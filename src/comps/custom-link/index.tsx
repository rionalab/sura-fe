import Link from 'next/link'

interface CustomLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
   href: string
}

const CustomLink = ({
   href,
   children,
   className,
   ...rest
}: CustomLinkProps) => {
   const isInternalLink = href.startsWith('/')
   const isAnchorLink = href.startsWith('#')

   if (isInternalLink || isAnchorLink) {
      return (
         <Link href={href} className={className} {...rest}>
            {children}
         </Link>
      )
   }

   return (
      <Link
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className={className}
         {...rest}
      >
         <span>{children}</span>
      </Link>
   )
}

export default CustomLink
