import React, { useCallback, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

// markdown
import CodeMirror, { EditorFromTextArea, Editor } from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/display/placeholder';

// components
import { Content } from 'components/atom';

export interface MarkdownEditorProps {
  name: string;
  initValue?: string;
  value: string;
  onChange(value: string): void;
}

const MarkdownEditor = ({ name, initValue, value, onChange }: MarkdownEditorProps): React.ReactElement => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const codeMirrorRef = useRef<EditorFromTextArea | null>(null);

  const onChangeCodeMirror = useCallback(
    (codemirror: Editor) => {
      onChange(codemirror.getValue());
    },
    [onChange],
  );

  const onClickWrapper = useCallback(() => {
    if (!textAreaRef.current) return;

    codeMirrorRef.current.focus();
  }, []);

  useEffect(() => {
    if (!textAreaRef.current) return;

    const cm = CodeMirror.fromTextArea(textAreaRef.current, {
      mode: 'markdown',
      lineWrapping: true,
    });

    codeMirrorRef.current = cm;
    cm.focus();
    cm.on('change', onChangeCodeMirror);

    if (initValue) cm.setValue(initValue);

    return () => {
      cm.toTextArea();
    };
  }, [initValue, onChangeCodeMirror]);

  return (
    <MarkdownEditorStyle id="post-editor" onClick={onClickWrapper}>
      <textarea ref={textAreaRef} style={{ border: 'none', display: 'none' }} />
    </MarkdownEditorStyle>
  );
};

export default MarkdownEditor;

const MarkdownEditorStyle = styled(Content)`
  width: 50%;
  min-height: 100vh;

  .CodeMirror {
    height: auto;
    font-size: 1rem;
    color: #252525;

    .cm-header {
    }

    .cm-header-1 {
      font-size: 3rem;
    }

    .cm-header-2 {
      font-size: 2.5rem;
    }

    .cm-header-3 {
      font-size: 2.2rem;
    }

    .cm-header-4 {
      font-size: 1.8rem;
    }

    .cm-header-5 {
      font-size: 1.4rem;
    }
  }
`;
