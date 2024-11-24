import type { NextConfig } from "next";

import withNextIntl from 'next-intl/plugin';

// Config custom i18n path.
const withNextIntlConfig = withNextIntl('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntlConfig(nextConfig);

