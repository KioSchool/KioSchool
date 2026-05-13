import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import type { PrerenderArguments, PrerenderResult } from 'vite-prerender-plugin';
import Home from '@pages/user/home/Home';
import Info from '@pages/user/info/Info';
import { getMarketingHeadElements, getMarketingSeoByPathname } from '@constants/marketingSeo';

interface FakeNode {
  parentNode: FakeElement | null;
}

interface FakeStyleSheet {
  cssRules: string[];
  insertRule: (rule: string, index: number) => void;
}

interface FakeElement extends FakeNode {
  children: FakeNode[];
  firstChild: FakeNode | null;
  nextSibling: FakeNode | null;
  sheet?: FakeStyleSheet;
  setAttribute: (_name: string, _value: string) => void;
  appendChild: (node: FakeNode) => FakeNode;
  insertBefore: (node: FakeNode, _before?: FakeNode | null) => FakeNode;
  removeChild: (node: FakeNode) => FakeNode;
}

interface FakeDocument {
  head: FakeElement;
  styleSheets: Array<{ ownerNode: FakeElement } & FakeStyleSheet>;
  querySelectorAll: (_selector: string) => FakeElement[];
  createElement: (tagName: string) => FakeElement;
  createTextNode: (text: string) => FakeNode & { textContent: string };
}

function createFakeElement(styleSheets: FakeDocument['styleSheets'], tagName: string): FakeElement {
  const element: FakeElement = {
    children: [],
    firstChild: null,
    nextSibling: null,
    parentNode: null,
    setAttribute: () => undefined,
    appendChild(node) {
      node.parentNode = element;
      element.children.push(node);
      element.firstChild = element.children[0] ?? null;
      return node;
    },
    insertBefore(node) {
      node.parentNode = element;
      element.children.push(node);
      element.firstChild = element.children[0] ?? null;
      return node;
    },
    removeChild(node) {
      element.children = element.children.filter((child) => child !== node);
      element.firstChild = element.children[0] ?? null;
      return node;
    },
  };

  if (tagName === 'style') {
    const sheet: FakeStyleSheet = {
      cssRules: [],
      insertRule(rule) {
        sheet.cssRules.push(rule);
      },
    };
    element.sheet = sheet;
    styleSheets.push({ ownerNode: element, ...sheet });
  }

  return element;
}

function ensurePrerenderDocument() {
  if (typeof document !== 'undefined') return;

  const styleSheets: FakeDocument['styleSheets'] = [];
  const head = createFakeElement(styleSheets, 'head');
  const fakeDocument: FakeDocument = {
    head,
    styleSheets,
    querySelectorAll: () => [],
    createElement: (tagName) => createFakeElement(styleSheets, tagName),
    createTextNode: (text) => ({
      parentNode: null,
      textContent: text,
    }),
  };

  Object.defineProperty(globalThis, 'document', {
    value: fakeDocument,
    configurable: true,
  });
}

function getPathname(url: string) {
  return new URL(url, 'https://kio-school.com').pathname;
}

export async function prerender({ url }: PrerenderArguments): Promise<PrerenderResult> {
  ensurePrerenderDocument();
  const pathname = getPathname(url);
  const seo = getMarketingSeoByPathname(pathname);
  const cache = createCache({ key: 'css' });
  const html = renderToString(
    <CacheProvider value={cache}>
      <HelmetProvider>
        <StaticRouter location={pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </StaticRouter>
      </HelmetProvider>
    </CacheProvider>,
  );

  return {
    html,
    head: {
      lang: 'ko',
      title: seo.title,
      elements: getMarketingHeadElements(pathname),
    },
  };
}
