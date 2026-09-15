export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatCompactRupiah(amount: number): string {
  if (amount >= 1_000_000_000) {
    const miliar = amount / 1_000_000_000;
    return `Rp ${miliar % 1 === 0 ? miliar : miliar.toFixed(2).replace(/\.?0+$/, '')} Miliar`;
  }
  if (amount >= 1_000_000) {
    const juta = amount / 1_000_000;
    return `Rp ${juta % 1 === 0 ? juta : juta.toFixed(1).replace(/\.?0+$/, '')} Juta`;
  }
  return formatRupiah(amount);
}

export function calculateKprMonthly(
  propertyPrice: number,
  downPaymentPercent: number,
  annualInterestRate: number,
  tenorYears: number
): {
  loanAmount: number;
  downPaymentAmount: number;
  monthlyInstallment: number;
  estimatedMinIncome: number;
} {
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, propertyPrice - downPaymentAmount);

  if (loanAmount <= 0) {
    return {
      loanAmount: 0,
      downPaymentAmount,
      monthlyInstallment: 0,
      estimatedMinIncome: 0
    };
  }

  const monthlyRate = annualInterestRate / 100 / 12;
  const totalMonths = tenorYears * 12;

  let monthlyInstallment = 0;
  if (monthlyRate === 0) {
    monthlyInstallment = loanAmount / totalMonths;
  } else {
    monthlyInstallment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  // Indonesian bank rule of thumb: installment should not exceed ~35% of monthly net income
  const estimatedMinIncome = monthlyInstallment / 0.35;

  return {
    loanAmount,
    downPaymentAmount,
    monthlyInstallment: Math.round(monthlyInstallment),
    estimatedMinIncome: Math.round(estimatedMinIncome)
  };
}

export function createWhatsAppLink(phoneNumber: string, message: string): string {
  const encodedMsg = encodeURIComponent(message);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

export function getQuickInstallmentEstimate(price: number): string {
  if (!price || price <= 0) return '-';
  const { monthlyInstallment } = calculateKprMonthly(price, 10, 4.25, 20);
  if (monthlyInstallment >= 1_000_000) {
    return `Rp ${(monthlyInstallment / 1_000_000).toFixed(1)} Jt/bln`;
  }
  return `${formatRupiah(monthlyInstallment)}/bln`;
}
