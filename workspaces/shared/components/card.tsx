import * as React from 'react'

export interface Props extends React.Props<{}> {}

export const Card = ({children}) => (
  <div className="Card">
    {children}

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
