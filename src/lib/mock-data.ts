// ============================================
// DADOS MOCKADOS PARA TESTE - LOG DOG
// Distribuidora de Cosméticos Pet
// ============================================

import { Client, Product, Order, Campaign, Message } from '@/types';

// --- PRODUTOS ---
export const mockProducts: Product[] = [
  { id: 'p1', name: 'Shampoo Neutro Pet 500ml', category: 'Banho', price: 32.90, description: 'Shampoo neutro para todas as raças', replenishment_days: 30 },
  { id: 'p2', name: 'Condicionador Hidratante 500ml', category: 'Banho', price: 38.50, description: 'Condicionador para pelos longos e ressecados', replenishment_days: 30 },
  { id: 'p3', name: 'Perfume Colônia Pet 120ml', category: 'Perfumaria', price: 24.90, description: 'Fragrância suave e duradoura', replenishment_days: 45 },
  { id: 'p4', name: 'Desembaraçador Spray 300ml', category: 'Tosa', price: 29.90, description: 'Facilita a tosa e desembaraça pelos', replenishment_days: 45 },
  { id: 'p5', name: 'Shampoo Clareador 500ml', category: 'Banho', price: 42.00, description: 'Para pelos claros e brancos', replenishment_days: 30 },
  { id: 'p6', name: 'Máscara Hidratação Profunda 500g', category: 'Tratamento', price: 58.00, description: 'Tratamento intensivo para pelos danificados', replenishment_days: 60 },
  { id: 'p7', name: 'Shampoo Antipulgas 500ml', category: 'Banho', price: 36.90, description: 'Combate pulgas e carrapatos', replenishment_days: 30 },
  { id: 'p8', name: 'Leave-in Protetor Térmico 200ml', category: 'Tratamento', price: 34.50, description: 'Proteção durante secagem', replenishment_days: 45 },
  { id: 'p9', name: 'Creme de Pentear 300ml', category: 'Tosa', price: 27.90, description: 'Para finalização e modelagem', replenishment_days: 30 },
  { id: 'p10', name: 'Shampoo Pelos Escuros 500ml', category: 'Banho', price: 42.00, description: 'Realça a cor de pelos escuros', replenishment_days: 30 },
  { id: 'p11', name: 'Kit Banho Profissional (3 itens)', category: 'Kits', price: 89.90, description: 'Shampoo + Condicionador + Perfume', replenishment_days: 30 },
  { id: 'p12', name: 'Loção Hidratante Patinhas 100ml', category: 'Tratamento', price: 19.90, description: 'Hidrata e protege as patinhas', replenishment_days: 60 },
];

// Função auxiliar para gerar datas relativas
function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

// --- CLIENTES ---
export const mockClients: Client[] = [
  { id: 'c1', name: 'Maria Silva', company: 'Pet Shop Amigo Fiel', city: 'São Paulo', state: 'SP', phone: '(11) 98765-4321', email: 'maria@amigofiel.com', last_purchase: daysAgo(3), total_orders: 24, total_spent: 12450.00, status: 'active', priority: 'high', created_at: '2024-01-15' },
  { id: 'c2', name: 'João Santos', company: 'Mundo Pet Center', city: 'Campinas', state: 'SP', phone: '(19) 97654-3210', email: 'joao@mundopet.com', last_purchase: daysAgo(8), total_orders: 18, total_spent: 8920.00, status: 'active', priority: 'high', created_at: '2024-02-20' },
  { id: 'c3', name: 'Ana Oliveira', company: 'Banho & Tosa Premium', city: 'Guarulhos', state: 'SP', phone: '(11) 96543-2109', email: 'ana@btpremium.com', last_purchase: daysAgo(12), total_orders: 15, total_spent: 6780.00, status: 'active', priority: 'medium', created_at: '2024-03-10' },
  { id: 'c4', name: 'Carlos Mendes', company: 'Pet Mania', city: 'Santo André', state: 'SP', phone: '(11) 95432-1098', email: 'carlos@petmania.com', last_purchase: daysAgo(18), total_orders: 12, total_spent: 5340.00, status: 'cooling', priority: 'high', created_at: '2024-03-25' },
  { id: 'c5', name: 'Fernanda Costa', company: 'Cachorro Cheiroso', city: 'Osasco', state: 'SP', phone: '(11) 94321-0987', email: 'fernanda@cachorrocheiroso.com', last_purchase: daysAgo(22), total_orders: 9, total_spent: 3890.00, status: 'cooling', priority: 'medium', created_at: '2024-04-05' },
  { id: 'c6', name: 'Roberto Lima', company: 'Arca de Noé Pet', city: 'Sorocaba', state: 'SP', phone: '(15) 93210-9876', email: 'roberto@arcapet.com', last_purchase: daysAgo(25), total_orders: 7, total_spent: 2870.00, status: 'cooling', priority: 'medium', created_at: '2024-04-15' },
  { id: 'c7', name: 'Patrícia Alves', company: 'Gato & Cia', city: 'Jundiaí', state: 'SP', phone: '(11) 92109-8765', email: 'patricia@gatosecia.com', last_purchase: daysAgo(35), total_orders: 11, total_spent: 4560.00, status: 'inactive', priority: 'high', created_at: '2024-02-10' },
  { id: 'c8', name: 'Lucas Ferreira', company: 'Pet Shop 4 Patas', city: 'Ribeirão Preto', state: 'SP', phone: '(16) 91098-7654', email: 'lucas@4patas.com', last_purchase: daysAgo(42), total_orders: 6, total_spent: 2340.00, status: 'inactive', priority: 'medium', created_at: '2024-05-01' },
  { id: 'c9', name: 'Amanda Souza', company: 'Bicho Papão Pet', city: 'Bauru', state: 'SP', phone: '(14) 90987-6543', email: 'amanda@bichopapao.com', last_purchase: daysAgo(50), total_orders: 4, total_spent: 1560.00, status: 'inactive', priority: 'low', created_at: '2024-05-15' },
  { id: 'c10', name: 'Marcos Rodrigues', company: 'Peludo & Feliz', city: 'São José dos Campos', state: 'SP', phone: '(12) 99876-5432', email: 'marcos@peludofeliz.com', last_purchase: daysAgo(5), total_orders: 20, total_spent: 9870.00, status: 'active', priority: 'high', created_at: '2024-01-20' },
  { id: 'c11', name: 'Camila Nunes', company: 'Au Au Store', city: 'Piracicaba', state: 'SP', phone: '(19) 98765-1234', email: 'camila@auau.com', last_purchase: daysAgo(28), total_orders: 8, total_spent: 3210.00, status: 'cooling', priority: 'medium', created_at: '2024-06-01' },
  { id: 'c12', name: 'Diego Martins', company: 'PetLove Center', city: 'Santos', state: 'SP', phone: '(13) 97654-2345', email: 'diego@petlovecenter.com', last_purchase: daysAgo(10), total_orders: 14, total_spent: 6120.00, status: 'active', priority: 'medium', created_at: '2024-03-05' },
  { id: 'c13', name: 'Juliana Pereira', company: 'Miau & Woof', city: 'Mogi das Cruzes', state: 'SP', phone: '(11) 96543-3456', email: 'juliana@miauwoof.com', last_purchase: daysAgo(45), total_orders: 5, total_spent: 1890.00, status: 'inactive', priority: 'low', created_at: '2024-07-10' },
  { id: 'c14', name: 'Ricardo Gomes', company: 'Cão Dourado Pet', city: 'Americana', state: 'SP', phone: '(19) 95432-4567', email: 'ricardo@caodourado.com', last_purchase: daysAgo(16), total_orders: 10, total_spent: 4230.00, status: 'cooling', priority: 'medium', created_at: '2024-04-20' },
  { id: 'c15', name: 'Beatriz Cardoso', company: 'Paraíso Animal', city: 'Limeira', state: 'SP', phone: '(19) 94321-5678', email: 'beatriz@paraisoanimal.com', last_purchase: daysAgo(2), total_orders: 22, total_spent: 11200.00, status: 'active', priority: 'high', created_at: '2024-01-05' },
];

// --- PEDIDOS (últimos pedidos de cada cliente) ---
export const mockOrders: Order[] = [
  {
    id: 'o1', client_id: 'c1', date: daysAgo(3), total: 298.50, status: 'completed',
    items: [
      { id: 'oi1', order_id: 'o1', product_id: 'p1', product_name: 'Shampoo Neutro Pet 500ml', quantity: 5, unit_price: 32.90, total: 164.50 },
      { id: 'oi2', order_id: 'o1', product_id: 'p3', product_name: 'Perfume Colônia Pet 120ml', quantity: 3, unit_price: 24.90, total: 74.70 },
      { id: 'oi3', order_id: 'o1', product_id: 'p9', product_name: 'Creme de Pentear 300ml', quantity: 2, unit_price: 27.90, total: 55.80 },
    ]
  },
  {
    id: 'o2', client_id: 'c2', date: daysAgo(8), total: 456.00, status: 'completed',
    items: [
      { id: 'oi4', order_id: 'o2', product_id: 'p5', product_name: 'Shampoo Clareador 500ml', quantity: 4, unit_price: 42.00, total: 168.00 },
      { id: 'oi5', order_id: 'o2', product_id: 'p6', product_name: 'Máscara Hidratação Profunda 500g', quantity: 3, unit_price: 58.00, total: 174.00 },
      { id: 'oi6', order_id: 'o2', product_id: 'p8', product_name: 'Leave-in Protetor Térmico 200ml', quantity: 2, unit_price: 34.50, total: 69.00 },
    ]
  },
  {
    id: 'o3', client_id: 'c3', date: daysAgo(12), total: 215.40, status: 'completed',
    items: [
      { id: 'oi7', order_id: 'o3', product_id: 'p1', product_name: 'Shampoo Neutro Pet 500ml', quantity: 3, unit_price: 32.90, total: 98.70 },
      { id: 'oi8', order_id: 'o3', product_id: 'p2', product_name: 'Condicionador Hidratante 500ml', quantity: 2, unit_price: 38.50, total: 77.00 },
      { id: 'oi9', order_id: 'o3', product_id: 'p12', product_name: 'Loção Hidratante Patinhas 100ml', quantity: 2, unit_price: 19.90, total: 39.80 },
    ]
  },
  {
    id: 'o4', client_id: 'c4', date: daysAgo(18), total: 179.40, status: 'completed',
    items: [
      { id: 'oi10', order_id: 'o4', product_id: 'p7', product_name: 'Shampoo Antipulgas 500ml', quantity: 3, unit_price: 36.90, total: 110.70 },
      { id: 'oi11', order_id: 'o4', product_id: 'p4', product_name: 'Desembaraçador Spray 300ml', quantity: 2, unit_price: 29.90, total: 59.80 },
    ]
  },
  {
    id: 'o5', client_id: 'c5', date: daysAgo(22), total: 269.70, status: 'completed',
    items: [
      { id: 'oi12', order_id: 'o5', product_id: 'p11', product_name: 'Kit Banho Profissional (3 itens)', quantity: 3, unit_price: 89.90, total: 269.70 },
    ]
  },
  {
    id: 'o6', client_id: 'c7', date: daysAgo(35), total: 189.00, status: 'completed',
    items: [
      { id: 'oi13', order_id: 'o6', product_id: 'p10', product_name: 'Shampoo Pelos Escuros 500ml', quantity: 3, unit_price: 42.00, total: 126.00 },
      { id: 'oi14', order_id: 'o6', product_id: 'p3', product_name: 'Perfume Colônia Pet 120ml', quantity: 2, unit_price: 24.90, total: 49.80 },
    ]
  },
  {
    id: 'o7', client_id: 'c10', date: daysAgo(5), total: 523.00, status: 'completed',
    items: [
      { id: 'oi15', order_id: 'o7', product_id: 'p1', product_name: 'Shampoo Neutro Pet 500ml', quantity: 5, unit_price: 32.90, total: 164.50 },
      { id: 'oi16', order_id: 'o7', product_id: 'p6', product_name: 'Máscara Hidratação Profunda 500g', quantity: 3, unit_price: 58.00, total: 174.00 },
      { id: 'oi17', order_id: 'o7', product_id: 'p11', product_name: 'Kit Banho Profissional (3 itens)', quantity: 2, unit_price: 89.90, total: 179.80 },
    ]
  },
  {
    id: 'o8', client_id: 'c15', date: daysAgo(2), total: 687.50, status: 'completed',
    items: [
      { id: 'oi18', order_id: 'o8', product_id: 'p5', product_name: 'Shampoo Clareador 500ml', quantity: 5, unit_price: 42.00, total: 210.00 },
      { id: 'oi19', order_id: 'o8', product_id: 'p2', product_name: 'Condicionador Hidratante 500ml', quantity: 5, unit_price: 38.50, total: 192.50 },
      { id: 'oi20', order_id: 'o8', product_id: 'p8', product_name: 'Leave-in Protetor Térmico 200ml', quantity: 5, unit_price: 34.50, total: 172.50 },
      { id: 'oi21', order_id: 'o8', product_id: 'p12', product_name: 'Loção Hidratante Patinhas 100ml', quantity: 4, unit_price: 19.90, total: 79.60 },
    ]
  },
  {
    id: 'o9', client_id: 'c12', date: daysAgo(10), total: 335.60, status: 'completed',
    items: [
      { id: 'oi22', order_id: 'o9', product_id: 'p1', product_name: 'Shampoo Neutro Pet 500ml', quantity: 4, unit_price: 32.90, total: 131.60 },
      { id: 'oi23', order_id: 'o9', product_id: 'p4', product_name: 'Desembaraçador Spray 300ml', quantity: 3, unit_price: 29.90, total: 89.70 },
      { id: 'oi24', order_id: 'o9', product_id: 'p9', product_name: 'Creme de Pentear 300ml', quantity: 4, unit_price: 27.90, total: 111.60 },
    ]
  },
  {
    id: 'o10', client_id: 'c14', date: daysAgo(16), total: 189.50, status: 'completed',
    items: [
      { id: 'oi25', order_id: 'o10', product_id: 'p7', product_name: 'Shampoo Antipulgas 500ml', quantity: 3, unit_price: 36.90, total: 110.70 },
      { id: 'oi26', order_id: 'o10', product_id: 'p12', product_name: 'Loção Hidratante Patinhas 100ml', quantity: 3, unit_price: 19.90, total: 59.70 },
    ]
  },
];

// --- CAMPANHAS ---
export const mockCampaigns: Campaign[] = [
  {
    id: 'camp1',
    title: 'Reposição de Shampoo',
    type: 'replenishment',
    description: 'Campanha para reposição mensal de shampoos',
    template: 'Olá {nome}! 🐾 Vi que faz {tempo_sem_comprar} dias desde sua última compra de {produto}. Que tal repor o estoque? Temos condições especiais para você!',
    image_url: '/campaign-replenishment.jpg',
    target_status: ['cooling', 'inactive'],
    created_at: '2024-06-01',
    is_active: true,
  },
  {
    id: 'camp2',
    title: 'Promoção de Inverno',
    type: 'promotion',
    description: 'Descontos em produtos de hidratação para o inverno',
    template: 'Fala {nome}! ❄️ O inverno chegou e os peludinhos precisam de cuidados extras! Temos a Máscara de Hidratação Profunda com 15% OFF. Bora repor o estoque?',
    image_url: '/campaign-winter.jpg',
    target_status: ['active', 'cooling'],
    created_at: '2024-06-15',
    is_active: true,
  },
  {
    id: 'camp3',
    title: 'Lançamento - Linha Premium',
    type: 'launch',
    description: 'Nova linha premium de tratamento capilar pet',
    template: 'Oi {nome}! 🌟 Tenho uma novidade incrível: acabou de chegar a nova Linha Premium de tratamento! Quer conhecer e garantir os primeiros lotes?',
    image_url: '/campaign-launch.jpg',
    target_status: ['active'],
    created_at: '2024-07-01',
    is_active: true,
  },
  {
    id: 'camp4',
    title: 'Reativação de Clientes',
    type: 'replenishment',
    description: 'Campanha focada em trazer de volta clientes inativos',
    template: 'Oi {nome}! Sentimos sua falta 😢 Faz {tempo_sem_comprar} dias que não fazemos negócio. Separei condições especiais pra {company}. Posso te mandar?',
    image_url: '/campaign-reactivation.jpg',
    target_status: ['inactive'],
    created_at: '2024-07-10',
    is_active: true,
  },
];

// --- MENSAGENS ENVIADAS ---
export const mockMessages: Message[] = [
  { id: 'm1', client_id: 'c4', client_name: 'Carlos Mendes', campaign_id: 'camp1', content: 'Olá Carlos! Vi que faz 18 dias desde sua última compra de Shampoo Antipulgas. Que tal repor o estoque?', status: 'sent', sent_at: daysAgo(1) },
  { id: 'm2', client_id: 'c7', client_name: 'Patrícia Alves', campaign_id: 'camp4', content: 'Oi Patrícia! Sentimos sua falta. Faz 35 dias que não fazemos negócio. Separei condições especiais para Gato & Cia.', status: 'sent', sent_at: daysAgo(2) },
  { id: 'm3', client_id: 'c1', client_name: 'Maria Silva', campaign_id: 'camp2', content: 'Fala Maria! O inverno chegou e os peludinhos precisam de cuidados extras! Temos a Máscara de Hidratação Profunda com 15% OFF.', status: 'sent', sent_at: daysAgo(3) },
];
