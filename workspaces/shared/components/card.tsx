import {Link} from '@shared/components'
import * as React from 'react'

export interface Props extends React.Props<{}> {
  href?: string
}

export const Card = ({children, href}: Props) => (
  <div className="Card">
    {href ? (
      <Link to={href}>
        {children}
      </Link>
    ) : children}

    <style jsx>{`
      .Card {
        padding: 15px;
        border-radius: 3px;
        background-color: #fff;
        box-shadow: 0 1px 1px 0 rgba(17, 18, 45, 0.5);
      }
    `}</style>
  </div>
)
