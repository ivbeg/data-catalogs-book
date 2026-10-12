import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {ErrorBoundaryErrorMessageFallback} from '@docusaurus/theme-common';
import {MermaidContainerClassName, useMermaidConfig} from '@docusaurus/theme-mermaid/client';
import {loadMermaid} from '@docusaurus/theme-mermaid/lib/client/loadMermaid.js';
import type {RenderResult} from 'mermaid';
import styles from './styles.module.css';

// Mermaid is a mutable singleton: concurrent initialize()/render() calls on first
// page load return empty SVGs for every diagram but one, so renders are queued.
let renderQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = renderQueue.then(task, task);
  renderQueue = run.catch(() => undefined);
  return run;
}

function renderMermaid(id: string, text: string, config: object): Promise<RenderResult> {
  return enqueue(async () => {
    const mermaid = await loadMermaid();
    mermaid.initialize(config);
    try {
      return await mermaid.render(id, text);
    } catch (e) {
      document.querySelector(`#d${id}`)?.remove();
      throw e;
    }
  });
}

function useMermaidRenderResult(text: string): RenderResult | null {
  const [result, setResult] = useState<RenderResult | null>(null);
  const [id] = useState(() => `mermaid-svg-${Math.round(Math.random() * 10000000)}`);
  const config = useMermaidConfig();

  useEffect(() => {
    let cancelled = false;
    renderMermaid(id, text, config)
      .then((r) => {
        if (!cancelled) {
          setResult(r);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setResult(() => {
            throw e;
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id, text, config]);

  return result;
}

function MermaidRenderResult({renderResult}: {renderResult: RenderResult}): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      renderResult.bindFunctions?.(ref.current);
    }
  }, [renderResult]);
  return (
    <div
      ref={ref}
      className={`${MermaidContainerClassName} ${styles.container}`}
      dangerouslySetInnerHTML={{__html: renderResult.svg}}
    />
  );
}

function MermaidRenderer({value}: {value: string}): ReactNode {
  const renderResult = useMermaidRenderResult(value);
  if (renderResult === null) {
    return null;
  }
  return <MermaidRenderResult renderResult={renderResult} />;
}

export default function Mermaid(props: {value: string}): ReactNode {
  return (
    <ErrorBoundary fallback={(params) => <ErrorBoundaryErrorMessageFallback {...params} />}>
      <MermaidRenderer {...props} />
    </ErrorBoundary>
  );
}
