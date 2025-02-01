import { ReactNode } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './pageTransition.css';

interface AnimatedRouteProps {
  children: ReactNode;
}

function AnimatedRoute({ children }: AnimatedRouteProps) {
  const location = useLocation();
  const navigationType = useNavigationType();

  const direction = navigationType === 'POP' ? 'backward' : 'forward';

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} timeout={300} classNames={`page-${direction}`} unmountOnExit>
        <div>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AnimatedRoute;
