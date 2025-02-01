import React, { ReactNode } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import './pageTransition.css';

interface AnimatedRouteProps {
  children: ReactNode;
}

function AnimatedRoute({ children }: AnimatedRouteProps) {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} timeout={300} classNames="page" unmountOnExit>
        <div className="page">{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AnimatedRoute;
