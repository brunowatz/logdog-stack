// ============================================
// FUNÇÕES UTILITÁRIAS - LOG DOG
// ============================================

import { ClientStatus } from '@/types';

/**
 * Calcula o status do cliente com base na data da última compra
 * <= 15 dias → ativo
 * 15-30 dias → esfriando
 * > 30 dias → inativo
 */
export function getClientStatus(lastPurchaseDate: string): ClientStatus {
  const days = daysSinceDate(lastPurchaseDate);
  if (days <= 15) return 'active';
  if (days <= 30) return 'cooling';
  return 'inactive';
}

/**
 * Retorna quantos dias se passaram desde uma data
 */
export function daysSinceDate(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Formata valor em reais
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata data para exibição (ex: 15 abr 2024)
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Retorna a cor CSS associada ao status
 */
export function getStatusColor(status: ClientStatus): string {
  switch (status) {
    case 'active': return '#22c55e';
    case 'cooling': return '#eab308';
    case 'inactive': return '#ef4444';
  }
}

/**
 * Retorna o label traduzido do status
 */
export function getStatusLabel(status: ClientStatus): string {
  switch (status) {
    case 'active': return 'Ativo';
    case 'cooling': return 'Esfriando';
    case 'inactive': return 'Inativo';
  }
}

/**
 * Retorna a cor de fundo suave do status
 */
export function getStatusBgColor(status: ClientStatus): string {
  switch (status) {
    case 'active': return 'rgba(34,197,94,0.12)';
    case 'cooling': return 'rgba(234,179,8,0.12)';
    case 'inactive': return 'rgba(239,68,68,0.12)';
  }
}

/**
 * Retorna o tipo de campanha traduzido
 */
export function getCampaignTypeLabel(type: string): string {
  switch (type) {
    case 'promotion': return 'Promoção';
    case 'replenishment': return 'Reposição';
    case 'launch': return 'Lançamento';
    default: return type;
  }
}

/**
 * Retorna o emoji do tipo de campanha
 */
export function getCampaignTypeEmoji(type: string): string {
  switch (type) {
    case 'promotion': return '🏷️';
    case 'replenishment': return '🔄';
    case 'launch': return '🚀';
    default: return '📣';
  }
}

/**
 * Gera um ID pseudo-aleatório
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Calcula classe CSS de prioridade
 */
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high': return '#f97316';
    case 'medium': return '#3b82f6';
    case 'low': return '#6b7280';
    default: return '#6b7280';
  }
}
