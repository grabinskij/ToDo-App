window.addEventListener('DOMContentLoaded', () => {
    const cookieStorage = {
      getItem: (key) => {
        const cookies = document.cookie
          .split(';')
          .map(cookie => cookie.split('='))
          .reduce((acc, [key, value]) => ({
            ...acc,
            [key.trim()]: value
          }), {});
  
        return cookies[key];
      },
      setItem: (key, value) => {
        document.cookie = `${key}=${value};expires=Sun, 17 Jul 3024 08:01:01 GMT`;
      }
    };
  
  
  
  
    const storageType = cookieStorage;
    const consentPropertyType = 'site_consent';
  
    let hasConsented = () => storageType.getItem(consentPropertyType) === "true" ? true : false;
    let toggleStorage = (prop) => storageType.setItem(consentPropertyType, prop);
    let isPopupVisible = false;
  
  
    const cookiePopup = document.getElementById('cookiePopup');
    const overlay = document.getElementById('overlay');
    const acceptCookiesBtns = document.querySelectorAll('.acceptCookiesBtn');
    const declineCookiesBtns = document.querySelectorAll('.declineCookiesBtn');
    const changeConsentBtn = document.querySelector('.change-consent-banner');
  
  
  
  
  
    function showChangeConsent() {
      changeConsentBtn.style.display = 'block';
    }
  
    function showCookiePopup() {
      overlay.style.display = 'block';
      cookiePopup.style.display = 'block';
    }
  
    function hideCookiePopup() {
      overlay.style.display = 'none';
      cookiePopup.style.display = 'none';
    }
  
  
  
   
  
    if (hasConsented()) {
      changeConsentBtn.style.display = 'block';
    }
    else {
      showCookiePopup();
    }
    if (storageType.getItem(consentPropertyType) === "false") {
      hideCookiePopup();
      showChangeConsent();
    }
  
    acceptCookiesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleStorage(true);
      hideCookiePopup();
      window.location.reload();
  
    });
  });
  
  
    declineCookiesBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toggleStorage(false);
        hideCookiePopup();
        showChangeConsent();
        window.location.reload();
      });
    });
  
  
    changeConsentBtn.addEventListener('click', () => {
      if (isPopupVisible) {
        hideCookiePopup();
      } else {
        showCookiePopup();
      }
      isPopupVisible = !isPopupVisible;
    });
  });