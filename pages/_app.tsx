import React from "react";
import { AppProps } from 'next/app';
import { styleRenderer, StyleProvider, ThemePicker } from 'vcc-ui';
import '../src/components/FilterNavigation.css';

const renderer = styleRenderer();

renderer.renderStatic(
  {
    boxSizing: 'border-box'
  },
  '*'
);

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <React.StrictMode>
      <StyleProvider renderer={renderer}>
        <ThemePicker variant="light">
          <Component {...pageProps} />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
};