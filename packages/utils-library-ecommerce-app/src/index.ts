export const formatTotal = (total: number) => {
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
  };
  
  export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  export const formatPercentage = (percentage: number) => {
    return `${percentage * 100}%`;
  };
  