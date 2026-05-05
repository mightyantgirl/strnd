// ============================================================
// DESIGN TOKENS — Figma 기준
// ============================================================

export const colors = {
  // Neutral
  white:           '#ffffff',
  cardBackground:  '#f9f8f6',  // $card-background
  background:      '#f1f0ec',  // $background
  border:          '#e4e3dc',  // $border
  disabled:        '#c8c7bf',  // $disabled
  placeholder:     '#a8a79f',  // $placeholder
  secondary:       '#6b6a62',  // $secondary
  primary:         '#2c2b27',  // $primary
  header:          '#141410',  // $header

  // Brand
  tint:            '#eaf2e5',  // $tint
  brand:           '#6b8f5e',  // $brand
  shade:           '#3d5435',  // $shade

  // Status
  success:         '#3b6d11',  // $success
  warning:         '#ba7517',  // $warning
  danger:          '#a32d2d',  // $danger
};

export const typography = {
  fontFamily: 'Pretendard, Apple SD Gothic Neo, -apple-system, sans-serif',

  // size: [mobile, tablet], lineHeight
  textLabel: { fontSize: [12, 13], lineHeight: 1    },
  text12:    { fontSize: [12, 13], lineHeight: 1.5  },
  text13:    { fontSize: [13, 14], lineHeight: 1.5  },
  text14:    { fontSize: [14, 16], lineHeight: 1.43 },
  text16:    { fontSize: [16, 18], lineHeight: 1.6  },
  text18:    { fontSize: [18, 24], lineHeight: 1.3  },
  text24:    { fontSize: [24, 32], lineHeight: 1.33 },
};
