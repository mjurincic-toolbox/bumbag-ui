import { css, cssClass } from '../styled';
import { breakpoint, theme } from '../utils';

export const Columns = styleProps => cssClass`
  display: flex;

  ${!styleProps.isGapless &&
    css`
      margin-left: -${theme('layout.gapUnit')(styleProps)}rem;
      margin-right: -${theme('layout.gapUnit')(styleProps)}rem;
      margin-top: -${theme('layout.gapUnit')(styleProps)}rem;

      &:last-child {
        margin-bottom: -${theme('layout.gapUnit')(styleProps)}rem;
      }
    `};

  ${getWrapProperties(styleProps)};

  & {
    ${theme('Columns.base')(styleProps)};
  }
`;

export const Column = styleProps => cssClass`
  flex: 1;
  max-width: 100%;

  ${!styleProps.isGapless &&
    css`
      padding: ${theme('layout.gapUnit')(styleProps)}rem;
    `};

  & {
    ${getSpreadProperties(styleProps)};
  }

  & {
    ${getSpreadOffsetProperties(styleProps)};
  }

  & {
    ${theme('Columns.Column.base')(styleProps)};
  }
`;

export const marginAutoOffsets: { [key: string]: any } = {
  left: css`
    margin-left: auto;
  `,
  both: css`
    margin-left: auto;
    margin-right: auto;
  `,
  right: css`
    margin-right: auto;
  `
};

export const getWidth = spread => `${(spread / 12) * 100}%`;

export function getWrapProperties(styleProps) {
  const { isOneLine, minBreakpoint } = styleProps;
  if (isOneLine) {
    if (minBreakpoint !== 'tablet' && minBreakpoint !== 'mobile') {
      return breakpoint(
        'max-tablet',
        css`
          flex-wrap: wrap;
        `
      )(styleProps);
    }
    if (minBreakpoint !== 'mobile') {
      return breakpoint(
        'max-mobile',
        css`
          flex-wrap: wrap;
        `
      )(styleProps);
    }
    return null;
  } else {
    return css`
      flex-wrap: wrap;
    `;
  }
}

export function getSpreadProperties(styleProps) {
  const {
    minBreakpoint,
    spread,
    spreadMobile,
    spreadTablet,
    spreadDesktop,
    spreadWidescreen,
    spreadFullHD
  } = styleProps;
  if (
    !minBreakpoint &&
    !spread &&
    !spreadMobile &&
    !spreadTablet &&
    !spreadDesktop &&
    !spreadWidescreen &&
    !spreadFullHD
  ) {
    return css`
      @media (max-width: ${theme('breakpoints.tablet')(styleProps)}px) {
        flex: none;
        width: 100%;
      }
    `;
  }

  const getProperties = ({ breakpoint, spread }: any) => {
    const properties = css`
      flex: none;
      width: ${getWidth(spread)};
    `;
    if (!spread) return null;
    if (breakpoint) {
      return css`
        @media (max-width: ${theme(`breakpoints.${breakpoint}`)(styleProps)}px) {
          ${properties};
        }
      `;
    }
    return properties;
  };

  return css`
    ${getProperties({ spread })};
    ${getProperties({ spread: spreadFullHD, breakpoint: 'fullHD' })};
    ${getProperties({ spread: spreadWidescreen, breakpoint: 'widescreen' })};
    ${getProperties({ spread: spreadDesktop, breakpoint: 'desktop' })};
    ${minBreakpoint !== 'tablet' &&
      minBreakpoint !== 'mobile' &&
      !spreadTablet &&
      !spreadMobile &&
      css`
        @media (max-width: ${theme('breakpoints.tablet')(styleProps)}px) {
          width: 100%;
        }
      `};
    ${getProperties({ spread: spreadTablet, breakpoint: 'tablet' })};
    ${minBreakpoint !== 'mobile' &&
      !spreadMobile &&
      css`
        @media (max-width: ${theme('breakpoints.mobile')(styleProps)}px) {
          width: 100%;
        }
      `};
    ${getProperties({ spread: spreadMobile, breakpoint: 'mobile' })};
  `;
}

export function getSpreadOffsetProperties(styleProps) {
  const {
    spreadOffset,
    spreadMobileOffset,
    spreadTabletOffset,
    spreadDesktopOffset,
    spreadWidescreenOffset,
    spreadFullHDOffset
  } = styleProps;
  if (
    !spreadOffset &&
    !spreadMobileOffset &&
    !spreadTabletOffset &&
    !spreadDesktopOffset &&
    !spreadWidescreenOffset &&
    !spreadFullHDOffset
  ) {
    return null;
  }

  const getProperties = ({ breakpoint, spreadOffset }: any) => {
    const properties = css`
      margin-left: ${getWidth(spreadOffset)};
    `;
    if (!spreadOffset) return null;
    if (breakpoint) {
      return css`
        @media (max-width: ${theme(`breakpoints.${breakpoint}`)(styleProps)}px) {
          ${properties};
        }
      `;
    }
    return properties;
  };

  if (typeof spreadOffset === 'number') {
    return css`
      ${getProperties({ spreadOffset })};
      ${getProperties({
        spreadOffset: spreadFullHDOffset,
        breakpoint: 'fullHD'
      })};
      ${getProperties({ spreadOffset: spreadWidescreenOffset, breakpoint: 'widescreen' })};
      ${getProperties({ spreadOffset: spreadDesktopOffset, breakpoint: 'desktop' })};
      ${!spreadTabletOffset &&
        !spreadMobileOffset &&
        css`
          @media (max-width: ${theme('breakpoints.tablet')(styleProps)}px) {
            margin-left: 0;
          }
        `};
      ${getProperties({ spreadOffset: spreadTabletOffset, breakpoint: 'tablet' })};
      ${!spreadMobileOffset &&
        css`
          @media (max-width: ${theme('breakpoints.mobile')(styleProps)}px) {
            margin-left: 0;
          }
        `};
      ${getProperties({ spreadOffset: spreadMobileOffset, breakpoint: 'mobile' })};
    `;
  }
  return marginAutoOffsets[spreadOffset];
}