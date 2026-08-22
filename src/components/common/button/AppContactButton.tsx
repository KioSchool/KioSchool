import styled from '@emotion/styled';
import { RiCustomerService2Fill } from '@remixicon/react';
import { Link } from 'react-router-dom';
import { USER_ROUTES } from '@constants/routes';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const FixedLink = styled(Link)`
  z-index: 1001;
  right: 0;
  bottom: 0;
  position: fixed;
  padding: 25px;
  box-sizing: border-box;
  color: ${Color.GREY};
  ${colFlex({ justify: 'center', align: 'center' })};

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

const ContactIcon = styled(RiCustomerService2Fill)`
  width: 50px;
  height: 50px;
`;

function AppContactButton() {
  return (
    <FixedLink to={USER_ROUTES.CONTACT} className="app-contact-button" aria-label="문의하기">
      <ContactIcon />
    </FixedLink>
  );
}

export default AppContactButton;
