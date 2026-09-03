export const laborRules = {
  country: 'El Salvador',
  currency: 'USD',
  currencySymbol: '$',
  daysInMonthlyPeriod: 30,
  maxWeeklyHours: 168,
  maxDailyHours: 24,
  maxConditionHours: 744,
  generalReference: 'Como referencia general en El Salvador, la jornada ordinaria diurna puede ser de hasta 44 horas semanales.',
  hourlyMethodNote: 'Para estimar el salario básico por hora, la herramienta obtiene primero un salario diario estimado a partir del salario mensual y posteriormente lo divide entre las horas de la jornada ordinaria diaria indicada.',
  scheduleDistributionNote: 'Las horas semanales y las horas ordinarias diarias pueden distribuirse de distintas maneras según el contrato y horario de cada empresa.',
  legalReference: 'La estructura del cálculo toma como referencia los artículos 142 y 169 del Código de Trabajo de El Salvador.',
  additionalHoursNote: 'Hora adicional es una clasificación utilizada por algunas empresas para determinadas horas trabajadas fuera del horario contratado. Su tratamiento puede variar según el contrato, jornada y políticas de la empresa.',
  disclaimer: 'Esta herramienta es orientativa y el resultado puede diferir de la planilla real según el contrato, forma de remuneración y políticas aplicables. No sustituye la revisión de tu contrato, planilla, reglamento interno ni asesoría del Ministerio de Trabajo.',
}

export const weeklyScheduleOptions = [
  { id: '30', label: '30 horas', hours: 30 },
  { id: '40', label: '40 horas', hours: 40 },
  { id: '44', label: '44 horas', hours: 44 },
  { id: 'custom', label: 'Personalizada', hours: null },
]

export const journeyTypes = [
  { id: 'day', label: 'Diurna' },
  { id: 'night', label: 'Nocturna' },
  { id: 'mixed', label: 'Mixta' },
]

export const laborConditions = [
  {
    id: 'normal-day',
    label: 'Hora normal diurna',
    tableLabel: 'Hora base diurna',
    multiplier: 1,
    description: 'Hora ordinaria seleccionada manualmente para una jornada diurna.',
  },
  {
    id: 'normal-night',
    label: 'Hora normal nocturna',
    tableLabel: 'Hora nocturna',
    multiplier: 1.25,
    description: 'Estimación orientativa para una hora nocturna.',
  },
  {
    id: 'additional-day',
    label: 'Hora adicional diurna',
    tableLabel: 'Hora adicional diurna',
    multiplier: 1,
    description: laborRules.additionalHoursNote,
    isAdditional: true,
  },
  {
    id: 'additional-night',
    label: 'Hora adicional nocturna',
    tableLabel: 'Hora adicional nocturna',
    multiplier: 1.25,
    description: laborRules.additionalHoursNote,
    isAdditional: true,
  },
  {
    id: 'extra-day',
    label: 'Hora extra diurna',
    tableLabel: 'Hora extra diurna',
    multiplier: 2,
    description: 'Estimación orientativa para una hora extra diurna seleccionada por el usuario.',
  },
  {
    id: 'extra-night',
    label: 'Hora extra nocturna',
    tableLabel: 'Hora extra nocturna',
    multiplier: 2.5,
    description: 'Estimación orientativa para una hora extra nocturna seleccionada por el usuario.',
  },
  {
    id: 'rest-day',
    label: 'Hora trabajada en día de descanso',
    tableLabel: 'Día de descanso',
    multiplier: 1.5,
    description: 'Estimación orientativa para una hora trabajada en un día de descanso.',
  },
  {
    id: 'holiday',
    label: 'Hora trabajada en asueto',
    tableLabel: 'Asueto',
    multiplier: 2,
    description: 'Estimación orientativa para una hora trabajada en asueto.',
  },
]
