/**
 * experiences.data.ts — Experience entries with code snippets for the Staggered Terminal timeline.
 *
 * Schema follows the Staggered Terminal architecture doc.
 * Future-ready: data can be fetched from an API/CMS by replacing this static array.
 */

export interface ExperienceCommand {
  name: string;
  output: string;
}

export interface Experience {
  id: string;
  category: string;
  title: string;
  period: string;
  description: string;
  terminalTitle: string;
  code: string;
  tech: string;
  commands: ExperienceCommand[];
  icon: 'code' | 'globe' | 'cpu' | 'smartphone';
}

export const EXPERIENCES: Experience[] = [
  {
    id: "kimi-inc",
    category: "Frontend Lead",
    title: "Senior Frontend Engineer · Kimi Inc",
    period: "2024 — Present",
    description:
      "Leading the core UI architecture for a next-generation visual coding platform. " +
      "Architected a scalable BEM SCSS framework that removed Tailwind dependency, " +
      "increasing render speed and providing a proprietary, highly-customizable design system. " +
      "Integrated AI subagent QA cycles for a \"Zero-Day Build\" methodology.",
    terminalTitle: "kimi_ui_arch.tsx",
    code:
`const DesignSystem = () => {
  const tokens = useDesignTokens();
  const theme = useThemeContext();

  return (
    <ThemeProvider tokens={tokens}>
      <GridLayout
        columns={{ base: 1, md: 2, lg: 3 }}
        gap={tokens.spacing.lg}
      >
        {sections.map(section => (
          <Section key={section.id}
            variant={theme.mode}
            animate={{ opacity: 1, y: 0 }}
          />
        ))}
      </GridLayout>
    </ThemeProvider>
  );
};`,
    tech: "React + Next.js + SCSS",
    commands: [
      { name: "Run Tests", output: "✓ 847 tests passed in 3.2s. Coverage: 94.7%. 0 regressions." },
      { name: "Build Prod", output: "📦 Bundle: 142KB gzipped. Lighthouse: 98/100. Zero warnings." },
    ],
    icon: "code",
  },
  {
    id: "uderly",
    category: "Full-Stack",
    title: "UI/UX Engineer · Uderly",
    period: "2022 — 2024",
    description:
      "Built a multi-locale e-commerce frontend covering cart, checkout and wishlist flows. " +
      "Established the SCSS/BEM design system still used in production. " +
      "Integrated i18n with 4 locales and real-time Supabase sync for inventory management.",
    terminalTitle: "commerce_engine.ts",
    code:
`async function processCheckout(
  cart: CartItem[],
  locale: Locale
): Promise<OrderResult> {
  const validated = await validateInventory(cart);
  const pricing = applyLocaleRules(validated, locale);

  const order = await supabase
    .from('orders')
    .insert({
      items: pricing.items,
      total: pricing.total,
      currency: locale.currency,
    })
    .select()
    .single();

  return { success: true, orderId: order.data.id };
}`,
    tech: "React + Supabase + i18n",
    commands: [
      { name: "E2E Suite", output: "✓ 64 Playwright scenarios passed. Cart → Checkout → Payment flow OK." },
      { name: "Locale Check", output: "🌍 4/4 locales verified: EN, IT, DE, FR. RTL: N/A." },
    ],
    icon: "globe",
  },
  {
    id: "uderlyy",
    category: "Full-Stack",
    title: "UI/UX Engineer · Uderly",
    period: "2022 — 2024",
    description:
      "Built a multi-locale e-commerce frontend covering cart, checkout and wishlist flows. " +
      "Established the SCSS/BEM design system still used in production. " +
      "Integrated i18n with 4 locales and real-time Supabase sync for inventory management.",
    terminalTitle: "commerce_engine.ts",
    code:
`async function processCheckout(
  cart: CartItem[],
  locale: Locale
): Promise<OrderResult> {
  const validated = await validateInventory(cart);
  const pricing = applyLocaleRules(validated, locale);

  const order = await supabase
    .from('orders')
    .insert({
      items: pricing.items,
      total: pricing.total,
      currency: locale.currency,
    })
    .select()
    .single();

  return { success: true, orderId: order.data.id };
}`,
    tech: "React + Supabase + i18n",
    commands: [
      { name: "E2E Suite", output: "✓ 64 Playwright scenarios passed. Cart → Checkout → Payment flow OK." },
      { name: "Locale Check", output: "🌍 4/4 locales verified: EN, IT, DE, FR. RTL: N/A." },
    ],
    icon: "globe",
  },
];
