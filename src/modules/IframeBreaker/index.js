'use client'

export default function IframeBreaker() {
  const inlineScript = `
    (function() {
      try {
        if (window.self !== window.top) {
          var targetUrl = window.location.href;
          // 1. Отправляем сообщение родителю
          if (window.parent) {
            window.parent.postMessage({ type: 'PAYMENT_SUCCESS_REDIRECT', url: targetUrl }, '*');
          }
          // 2. Мгновенно меняем URL верхнего окна
          window.top.location.href = targetUrl;
        }
      } catch (e) {
        // Фолбэк для Cross-Origin ограничений
        try { window.open(window.location.href, '_top'); } catch (err) {}
      }
    })();
  `

  return (
    <script
      dangerouslySetInnerHTML={{ __html: inlineScript }}
    />
  )
}
