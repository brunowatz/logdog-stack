'use client';

import { useState, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingCart,
  DollarSign,
  MessageSquare,
  Send,
  Repeat,
  Sparkles,
  Package,
  ClipboardList,
  X,
} from 'lucide-react';
import {
  getClientById,
  getOrdersByClientId,
  getSuggestionsForClient,
  sendMessage,
  personalizeMessage,
  getCampaigns,
} from '@/lib/data-service';
import { formatCurrency, formatDate, daysSinceDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import StatusBadge from '@/components/StatusBadge';
import Toast from '@/components/Toast';

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [client, setClient] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [clientData, ordersData, suggestionsData, campaignsData] = await Promise.all([
        getClientById(clientId),
        getOrdersByClientId(clientId),
        getSuggestionsForClient(clientId),
        getCampaigns()
      ]);
      
      setClient(clientData);
      setOrders(ordersData);
      setSuggestions(suggestionsData);
      setCampaigns(campaignsData);
      setLoading(false);
    }
    loadData();
  }, [clientId]);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'suggestions'>('orders');

  if (loading) {
    return <div className="animate-in" style={{ padding: '40px', textAlign: 'center' }}>Carregando detalhes do cliente...</div>;
  }

  if (!client) {
    return (
      <div className="empty-state animate-in">
        <div className="empty-state-icon">😕</div>
        <h3>Cliente não encontrado</h3>
        <p>O cliente solicitado não existe</p>
        <Link href="/clients" className="btn btn-primary" style={{ marginTop: '16px' }}>
          <ArrowLeft size={16} /> Voltar para Clientes
        </Link>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    sendMessage(client.id, messageText);
    setShowMessageModal(false);
    setMessageText('');
    setToast({ message: `Mensagem enviada para ${client.name}!`, type: 'success' });
  };

  const handleUseCampaign = (template: string) => {
    setMessageText(personalizeMessage(template, client));
    setShowMessageModal(true);
  };

  const daysSince = daysSinceDate(client.last_purchase);

  return (
    <div className="animate-in">
      {/* Back nav */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/clients" className="btn btn-ghost" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} /> Voltar para Clientes
        </Link>
      </div>

      {/* Header Card */}
      <div className="card" style={{ marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        {/* Top gradient bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${getStatusColor(client.status)}, var(--brand-primary))`,
        }} />

        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${getStatusColor(client.status)}20, ${getStatusColor(client.status)}40)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: '800',
            color: getStatusColor(client.status),
            flexShrink: 0,
          }}>
            {client.name.charAt(0)}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '700' }}>{client.name}</h1>
              <StatusBadge status={client.status} />
            </div>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {client.company}
            </p>

            <div style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              fontSize: '13px',
              color: 'var(--text-muted)',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} /> {client.phone}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} /> {client.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} /> {client.city}/{client.state}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button
              className="btn btn-primary"
              onClick={() => setShowMessageModal(true)}
            >
              <MessageSquare size={16} /> Enviar Mensagem
            </button>
            <button className="btn btn-success">
              <ClipboardList size={16} /> Registrar Pedido
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '24px' }}>
        <div className="stat-card blue">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Calendar size={18} style={{ color: '#06b6d4' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
              Última Compra
            </span>
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700' }}>{formatDate(client.last_purchase)}</div>
          <div style={{
            fontSize: '12px',
            marginTop: '4px',
            color: daysSince > 30 ? '#f87171' : daysSince > 15 ? '#facc15' : '#4ade80',
            fontWeight: '600',
          }}>
            {daysSince} dias atrás
          </div>
        </div>

        <div className="stat-card purple">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <ShoppingCart size={18} style={{ color: '#818cf8' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
              Total de Pedidos
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#818cf8' }}>{client.total_orders}</div>
        </div>

        <div className="stat-card green">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <DollarSign size={18} style={{ color: '#4ade80' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
              Total Gasto
            </span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#4ade80' }}>{formatCurrency(client.total_spent)}</div>
        </div>

        <div className="stat-card yellow">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={18} style={{ color: '#facc15' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
              Sugestões
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#facc15' }}>{suggestions.length}</div>
        </div>
      </div>

      {/* Content area */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left: Tabs - Orders & Suggestions */}
        <div>
          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingCart size={14} style={{ marginRight: '6px' }} />
              Histórico de Pedidos ({orders.length})
            </button>
            <button
              className={`tab ${activeTab === 'suggestions' ? 'active' : ''}`}
              onClick={() => setActiveTab('suggestions')}
            >
              <Sparkles size={14} style={{ marginRight: '6px' }} />
              Sugestões ({suggestions.length})
            </button>
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {orders.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">📦</div>
                  <h3>Nenhum pedido encontrado</h3>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="card">
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px',
                    }}>
                      <div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          Pedido #{order.id.toUpperCase()}
                        </span>
                        <div style={{ fontSize: '14px', fontWeight: '600' }}>
                          {formatDate(order.date)}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#4ade80',
                      }}>
                        {formatCurrency(order.total)}
                      </div>
                    </div>

                    {/* Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px 12px',
                            background: 'var(--bg-surface)',
                            borderRadius: '8px',
                            fontSize: '13px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Package size={14} style={{ color: 'var(--brand-primary-light)' }} />
                            <span>{item.product_name}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-secondary)' }}>
                            <span>{item.quantity}x {formatCurrency(item.unit_price)}</span>
                            <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                              {formatCurrency(item.total)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Suggestions Tab */}
          {activeTab === 'suggestions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {suggestions.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">💡</div>
                  <h3>Nenhuma sugestão no momento</h3>
                </div>
              ) : (
                suggestions.map((sug, i) => (
                  <div key={i} className="suggestion-card">
                    <div
                      className="suggestion-icon"
                      style={{
                        background: sug.type === 'replenishment'
                          ? 'rgba(234,179,8,0.12)'
                          : 'rgba(99,102,241,0.12)',
                        color: sug.type === 'replenishment' ? '#facc15' : '#818cf8',
                      }}
                    >
                      {sug.type === 'replenishment' ? <Repeat size={18} /> : <Sparkles size={18} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: sug.type === 'replenishment' ? '#facc15' : '#818cf8',
                        marginBottom: '4px',
                      }}>
                        {sug.type === 'replenishment' ? '🔄 Possível Reposição' : '✨ Produto Complementar'}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                        {sug.product.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {sug.reason}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#4ade80',
                        marginTop: '8px',
                      }}>
                        {formatCurrency(sug.product.price)}
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setMessageText(
                          `Olá ${client.name.split(' ')[0]}! Vi que você pode precisar repor ${sug.product.name}. Posso te enviar uma proposta?`
                        );
                        setShowMessageModal(true);
                      }}
                    >
                      <Send size={14} />
                      Oferecer
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right: Quick actions + Campaigns */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Campanhas disponíveis */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">📣 Campanhas Disponíveis</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {campaigns.filter(c => c.is_active).map((campaign) => (
                <div
                  key={campaign.id}
                  style={{
                    padding: '14px',
                    background: 'var(--bg-surface)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid var(--border-subtle)',
                  }}
                  onClick={() => handleUseCampaign(campaign.template)}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: campaign.type === 'promotion'
                      ? 'rgba(239,68,68,0.12)' 
                      : campaign.type === 'launch'
                      ? 'rgba(99,102,241,0.12)'
                      : 'rgba(234,179,8,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                  }}>
                    {campaign.type === 'promotion' ? '🏷️' : campaign.type === 'launch' ? '🚀' : '🔄'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{campaign.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{campaign.description}</div>
                  </div>
                  <Send size={14} style={{ color: 'var(--brand-primary-light)' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Mensagem rápida sugerida */}
          {client.status !== 'active' && (
            <div className="card" style={{ borderLeft: '3px solid var(--brand-primary)' }}>
              <div className="card-header">
                <span className="card-title">💬 Sugestão de Mensagem</span>
              </div>
              <div className="message-preview">
                {client.status === 'inactive'
                  ? `Oi ${client.name.split(' ')[0]}! Sentimos sua falta 😢 Faz ${daysSince} dias que não fazemos negócio. Separei condições especiais pra ${client.company}. Posso te mandar?`
                  : `Fala ${client.name.split(' ')[0]}! 🐾 Vi que faz ${daysSince} dias desde a última compra. Tem novidade chegando! Quer dar uma olhada?`
                }
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  const text = client.status === 'inactive'
                    ? `Oi ${client.name.split(' ')[0]}! Sentimos sua falta 😢 Faz ${daysSince} dias que não fazemos negócio. Separei condições especiais pra ${client.company}. Posso te mandar?`
                    : `Fala ${client.name.split(' ')[0]}! 🐾 Vi que faz ${daysSince} dias desde a última compra. Tem novidade chegando! Quer dar uma olhada?`;
                  setMessageText(text);
                  setShowMessageModal(true);
                }}
              >
                <Send size={16} /> Usar esta mensagem
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal - Enviar Mensagem */}
      {showMessageModal && (
        <div className="modal-overlay" onClick={() => setShowMessageModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📩 Enviar Mensagem</h2>
              <button
                onClick={() => setShowMessageModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                background: 'var(--bg-surface)',
                borderRadius: '10px',
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: `${getStatusColor(client.status)}20`,
                  color: getStatusColor(client.status),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                }}>
                  {client.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{client.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{client.phone}</div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Mensagem</label>
              <textarea
                className="form-textarea"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                rows={5}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setShowMessageModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleSendMessage}>
                <Send size={16} /> Enviar Mensagem
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
