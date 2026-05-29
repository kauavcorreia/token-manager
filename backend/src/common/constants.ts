// Constantes do sistema
export const BUSINESS_HOURS = {
  START: 7, // 07:00
  END: 17, // 17:00
};

export const NO_SHOW_PROBABILITY = 0.05; // 5%

export const ATTENDANCE_TIME = {
  SP: {
    BASE: 15,
    VARIANCE: 5, // ± 5 minutos (10-20 min)
  },
  SE: {
    STANDARD: 1, // 1 minuto (95% dos casos)
    EXTENDED: 5, // 5 minutos (5% dos casos)
    EXTENDED_PROBABILITY: 0.05,
  },
  SG: {
    BASE: 5,
    VARIANCE: 3, // ± 3 minutos (2-8 min)
  },
};

export const QUEUE_ORDER = ['SP', 'SE', 'SG']; // Ordem de prioridade

export const LAST_TICKETS_DISPLAY = 5; // Mostrar últimas 5 no painel
