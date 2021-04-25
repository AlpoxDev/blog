import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';

// components
import { Content, Text } from '../../atom';

export interface DropdownProps {
  className?: string;
  children?: React.ReactNode;
  items: string[] | any[];
  itemKey?: string;
  onSelectItem(item: any): void;
  position?: 'left' | 'right';
}

export const Dropdown = ({
  className,
  children,
  position = 'left',
  items,
  itemKey,
  onSelectItem,
}: DropdownProps): React.ReactElement => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChange = useCallback(() => {
    setIsOpen((state: boolean) => !state);
  }, []);

  const onClickOutside = useCallback(
    (event) => {
      if ((wrapperRef.current, listRef.current)) {
        if (!wrapperRef.current.contains(event.target) && !listRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    },
    [wrapperRef, listRef],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('mousedown', onClickOutside);
    };
  }, [typeof window, onClickOutside]);

  const dropdownList = items.map((item: string | any, index: number) => {
    if (typeof item === 'string')
      return (
        <DropdownItem key={`dropdown-${index}`} pointer onClick={() => onSelectItem(item)} fontFamily="inter">
          {item}
        </DropdownItem>
      );
    else if (itemKey && item[itemKey])
      return (
        <DropdownItem key={`dropdown-${index}`} pointer onClick={() => onSelectItem(item)} fontFamily="inter">
          {item[itemKey]}
        </DropdownItem>
      );

    return null;
  });

  return (
    <DropdownContainer className={className} ref={wrapperRef} onClick={onChange}>
      {children}
      {isOpen && (
        <DropdownWrapper id="dropdown-wrapper" ref={listRef} position={position}>
          {dropdownList}
        </DropdownWrapper>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const DropdownWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: calc(100% + 0.2rem);
  ${(props) => props.position && `${props.position}: 0;`}

  min-width: 8rem;
  max-width: 31.25rem;
  z-index: 3;

  background-color: #fff;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
  border-radius: 8px;
`;

const DropdownItem = styled(Text.Content)`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.14);

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: 0;
  }

  &:hover {
    background-color: #252525;
    color: #fff;
  }
`;
