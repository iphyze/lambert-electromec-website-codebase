const IconBase = ({ size = 18, children, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {children}
  </svg>
)

export const FacebookIcon = ({ size = 18, ...props }) => (
  <IconBase size={size} {...props}>
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.094 10.125 24v-8.492H7.078v-3.435h3.047V9.454c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.972h-1.513c-1.49 0-1.956.93-1.956 1.884v2.224h3.328l-.532 3.435h-2.796V24C19.612 23.094 24 18.099 24 12.073Z" />
  </IconBase>
)

export const InstagramIcon = ({ size = 18, ...props }) => (
  <IconBase size={size} {...props}>
    <path d="M7.75 2h8.5A5.756 5.756 0 0 1 22 7.75v8.5A5.756 5.756 0 0 1 16.25 22h-8.5A5.756 5.756 0 0 1 2 16.25v-8.5A5.756 5.756 0 0 1 7.75 2Zm0 2A3.754 3.754 0 0 0 4 7.75v8.5A3.754 3.754 0 0 0 7.75 20h8.5A3.754 3.754 0 0 0 20 16.25v-8.5A3.754 3.754 0 0 0 16.25 4h-8.5Zm8.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
  </IconBase>
)

export const LinkedinIcon = ({ size = 18, ...props }) => (
  <IconBase size={size} {...props}>
    <path d="M5.339 7.668H1.334V20.5h4.005V7.668ZM3.337 1.5A2.337 2.337 0 1 0 3.34 6.174 2.337 2.337 0 0 0 3.337 1.5ZM20.5 13.14c0-3.868-2.064-5.667-4.816-5.667-2.219 0-3.213 1.22-3.768 2.077V7.668H7.912V20.5h4.004v-6.356c0-1.675.317-3.297 2.394-3.297 2.047 0 2.072 1.915 2.072 3.405V20.5h4.003l.115-7.36Z" />
  </IconBase>
)

export const XSocialIcon = ({ size = 18, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.654l-5.21-6.817-5.957 6.817H1.697l7.73-8.835L1.274 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
)
