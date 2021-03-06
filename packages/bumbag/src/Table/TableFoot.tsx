import React from 'react';
import { Box as ReakitBox } from 'reakit';

import { useClassName, createComponent, createElement, createHook } from '../utils';
import { Box, BoxProps } from '../Box';

import { TableContext } from './Table';
import * as styles from './styles';

export type LocalTableFootProps = {};
export type TableFootProps = BoxProps & LocalTableFootProps;

const useProps = createHook<TableFootProps>(
  (props, { themeKey, themeKeyOverride }) => {
    const boxProps = Box.useProps(props);

    const tableContext = React.useContext(TableContext);

    const className = useClassName({
      style: styles.TableFoot,
      styleProps: { ...tableContext, ...props, overrides: { ...tableContext.overrides, ...props.overrides } },
      themeKey,
      themeKeyOverride,
      prevClassName: boxProps.className,
    });

    return { ...boxProps, className };
  },
  { themeKey: 'Table.Foot' }
);

export const TableFoot = createComponent<TableFootProps>(
  (props) => {
    const textProps = useProps(props);
    return createElement({ children: props.children, component: ReakitBox, use: props.use, htmlProps: textProps });
  },
  {
    attach: {
      useProps,
      displayName: 'Table.Foot',
    },
    defaultProps: {
      use: 'tfoot',
    },
    themeKey: 'Table.Foot',
  }
);
