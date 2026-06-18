// Valores iniciales orientativos. Deben validarse con fuentes oficiales en una fase posterior.
export const laborRules = {
  country: 'El Salvador',
  currency: 'USD',
  currencySymbol: '$',
  monthlyBaseHours: 240,
  disclaimer: 'Este cálculo es orientativo y debe verificarse con información oficial del Ministerio de Trabajo o asesoría correspondiente.',
}

export const laborConditions = [
  { id: 'normal-day', label: 'Hora normal diurna', multiplier: 1 },
  { id: 'normal-night', label: 'Hora normal nocturna', multiplier: 1.25 },
  { id: 'extra-day', label: 'Hora extra diurna', multiplier: 2 },
  { id: 'extra-night', label: 'Hora extra nocturna', multiplier: 2.5 },
  { id: 'rest-day', label: 'Hora trabajada en día de descanso', multiplier: 1.5 },
  { id: 'holiday', label: 'Hora trabajada en asueto', multiplier: 2 },
]
