import * as React from 'react';
import classNames from 'classnames';
import { breakpoint, useClassName } from '../utils';
import { css, cssClass } from '../styled';

export type LocalShowProps = {
  above?: string;
  below?: string;
};
export type ShowProps = LocalShowProps;

const belowBreakpoints = {
  tablet: 'mobile',
  desktop: 'tablet',
  widescreen: 'desktop',
  fullHD: 'widescreen',
};

export function Show(props) {
  const { above, below } = props;

  let breakpoint;
  if (above) {
    breakpoint = `min-${above}`;
  } else if (below) {
    breakpoint = `max-${belowBreakpoints[below]}`;
  }

  const showClassName = useClassName({
    style: showStyle,
    styleProps: { breakpoint },
  });

  let children = transformChildren(props.children, showClassName, 0);

  return children;
}

function transformChildren(children, className, index) {
  if (typeof children === 'string') {
    return (
      <span key={index} className={className}>
        {children}
      </span>
    );
  } else if (React.isValidElement(children)) {
    if (children.type.toString() === 'Symbol(react.fragment)') {
      return {
        ...children,
        props: {
          ...((children.props || {}) as Object),
          // @ts-ignore
          children: transformChildren((children.props || {}).children, className, 0),
        },
      };
    }
    return {
      ...children,
      // @ts-ignore
      props: { ...((children.props || {}) as Object), className: classNames(children.props.className, className) },
    };
  } else if (Array.isArray(children)) {
    return children.map((child, index) => transformChildren(child, className, index));
  }
  return null;
}

export const showStyle = (styleProps) => cssClass`
  ${breakpoint(
    styleProps.breakpoint,
    css`
      display: none;
    `,
    { show: true }
  )(styleProps)};
`;