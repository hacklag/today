import {FlexLayout} from '@shared/components'
import {UI} from '@shared/config'
import * as React from 'react'

export const TitleBar = ({children}) => (
  <div className="TitleBar">
    <FlexLayout split middle>
      {children}
    </FlexLayout>

    <style jsx>{`
      .TitleBar {
        background-color: ${UI.colors.primary};
        padding: ${UI.spacing.sm} 10px;
        font-weight: 600;
        color: #fff;
      }
      .TitleBar :global(a) {
        padding: 0 8px;
        color: inherit;
      }
      .TitleBar :global(.FlexLayout) :global(:nth-child(2)) {
        width: 100%;
        font-size: 18px;
        color: #fff;
        font-weight: 600;
        text-align: center;
      }
      .TitleBar :global(.FlexLayout) > :global(:first-child) {
        text-align: left;
      }
      .TitleBar :global(.FlexLayout) > :global(:first-child),
      .TitleBar :global(.FlexLayout) > :global(:last-child) {
        width: 30px;
      }
    `}</style>
  </div>
)
