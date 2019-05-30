import React from 'react';
import './Animations.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface IProps {
  count: string | undefined;
  children: any;
}

export const Slide: React.FC<IProps> = ({ count, children }) => (
  <TransitionGroup>
    <CSSTransition appear={false} key={count} timeout={1000} classNames={'slide'}>
      {children}
    </CSSTransition>
  </TransitionGroup>
);
