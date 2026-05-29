export const validateToken = (token: string): boolean => {
  // Padrão: YYMMDD-PPSQ
  const pattern = /^\d{6}-(SP|SE|SG)\d{2}$/
  return pattern.test(token)
}

export const validateGuicheNumber = (number: number): boolean => {
  return number > 0 && number <= 10
}
