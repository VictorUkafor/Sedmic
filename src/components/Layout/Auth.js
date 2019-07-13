import React from 'react';
import AuthSignup from './AuthSignup';
import background from '../../assets/media/bg/bg-4.jpg';
import logo from '../../assets/media/company-logos/logo-2.png';


const Auth = (props) => {
  const { children, login } = props;

  return (
    <div className="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--enabled kt-subheader--transparent kt-aside--enabled kt-aside--fixed kt-page--loading full-page">

      <div className="kt-grid kt-grid--ver kt-grid--root kt-page">
        <div className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v6 kt-login--signin" id="kt_login">
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
            <div className="kt-grid__item  kt-grid__item--order-tablet-and-mobile-2  kt-grid kt-grid--hor kt-login__aside">
              <div className="kt-login__wrapper">
                <div className="kt-login__container">
                  <div className="kt-login__body">
                    <div className="kt-login__logo">
                      <img src={logo} alt="" />
                    </div>

                    {children}

                  </div>
                </div>


                {login && <AuthSignup />}

              </div>
            </div>

            <div className="kt-grid__item kt-grid__item--fluid kt-grid__item--center kt-grid kt-grid--ver kt-login__content" style={{ backgroundImage: `url(${background})` }}>
              <div className="kt-login__section">
                <div className="kt-login__block">
                  <h3 className="kt-login__title">Join Our Community</h3>
                  <div className="kt-login__desc">
                        Lorem ipsum dolor sit amet, coectetuer adipiscing
                    <br />elit sed diam nonummy et nibh euismod
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Auth;
