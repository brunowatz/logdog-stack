-- ============================================
-- LOG DOG - SEED DATA
-- Populate the database with initial mock data
-- ============================================

-- 1. PRODUTOS
INSERT INTO products (id, name, category, price, replenishment_days, description) VALUES
('p1', 'Shampoo Pet Brilho Intenso 5L', 'Banho', 189.90, 30, 'Shampoo profissional para alto rendimento.'),
('p2', 'Shampoo Filhotes Suave 5L', 'Banho', 195.00, 45, 'Fórmula hipoalergênica para pets jovens.'),
('p3', 'Condicionador Revitalizante 5L', 'Banho', 210.00, 40, 'Hidratação profunda pós-shampoo.'),
('p4', 'Máscara Hidratação Argan 1kg', 'Tratamento', 120.00, 60, 'Tratamento intensivo para pelos danificados.'),
('p5', 'Queratina Líquida Spray 500ml', 'Tratamento', 85.00, 90, 'Reconstrução capilar pet.'),
('p6', 'Perfume Pet Summer Breeze 500ml', 'Perfumaria', 145.00, 120, 'Fragrância refrescante de longa duração.'),
('p7', 'Perfume Pet Baby Powder 500ml', 'Perfumaria', 145.00, 120, 'Fragrância clássica de talco.'),
('p8', 'Lâmina de Tosa 10 UltraEdge', 'Tosa', 250.00, 180, 'Aço carbono de alta precisão.'),
('p9', 'Máquina de Tosa Profissional V5', 'Tosa', 1200.00, 365, 'Motor potente e silencioso.'),
('p10', 'Kit Higiene Auricular 1L', 'Tratamento', 75.00, 60, 'Limpeza segura dos ouvidos.'),
('p11', 'Shampoo Antisseborreico 500ml', 'Tratamento', 65.00, 30, 'Uso veterinário sob prescrição.'),
('p12', 'Kit Promocional Banho e Tosa', 'Kits', 450.00, 30, 'Mix de shampoos e perfumes campeões.');

-- 2. CLIENTES
-- Nota: Datas de última compra variam para demonstrar os diferentes status (ativo, esfriando, inativo)
INSERT INTO clients (id, name, company, city, state, phone, email, last_purchase, total_orders, total_spent, priority) VALUES
('c1', 'Maria Silva', 'Pet Charmoso', 'São Paulo', 'SP', '(11) 98888-7777', 'contato@petcharmoso.com', CURRENT_DATE - INTERVAL '5 days', 12, 4500.00, 'high'),
('c2', 'João Santos', 'Banho do Totó', 'Campinas', 'SP', '(19) 97777-6666', 'joao@banhototo.com.br', CURRENT_DATE - INTERVAL '10 days', 8, 2800.00, 'medium'),
('c3', 'Ana Oliveira', 'Pet Shop Amigão', 'São Bernardo', 'SP', '(11) 96666-5555', 'ana@amigao.com', CURRENT_DATE - INTERVAL '18 days', 15, 6200.00, 'high'),
('c4', 'Ricardo Lima', 'Cão & Gato Estética', 'Santo André', 'SP', '(11) 95555-4444', 'ricardo@caoegato.com', CURRENT_DATE - INTERVAL '22 days', 5, 1500.00, 'low'),
('c5', 'Beatriz Costa', 'Peluagem VIP', 'Santos', 'SP', '(13) 94444-3333', 'vendas@peluagemvip.com', CURRENT_DATE - INTERVAL '35 days', 20, 8900.00, 'high'),
('c6', 'Marcos Rocha', 'Pet Station', 'Jundiaí', 'SP', '(11) 93333-2222', 'marcos@petstation.com', CURRENT_DATE - INTERVAL '40 days', 3, 850.00, 'medium'),
('c7', 'Fernanda Lima', 'Bicho Mimado', 'Sorocaba', 'SP', '(15) 92222-1111', 'fernanda@bichomimado.com', CURRENT_DATE - INTERVAL '2 days', 25, 12500.00, 'high'),
('c8', 'Paulo Souza', 'Mega Pet', 'Guarulhos', 'SP', '(11) 91111-0000', 'paulo@megapet.com', CURRENT_DATE - INTERVAL '28 days', 6, 2100.00, 'medium'),
('c9', 'Carla Mendes', 'Estética Animal', 'Osasco', 'SP', '(11) 90000-9999', 'carla@esteticaanimal.com', CURRENT_DATE - INTERVAL '12 days', 10, 3400.00, 'medium'),
('c10', 'Roberto Almeida', 'Dog Style', 'Ribeirão Preto', 'SP', '(16) 99999-8888', 'roberto@dogstyle.com', CURRENT_DATE - INTERVAL '45 days', 4, 1200.00, 'low');

-- 3. PEDIDOS (Exemplos)
INSERT INTO orders (id, client_id, date, total, status) VALUES
('o1', 'c1', CURRENT_DATE - INTERVAL '5 days', 379.80, 'completed'),
('o2', 'c3', CURRENT_DATE - INTERVAL '18 days', 500.00, 'completed'),
('o3', 'c5', CURRENT_DATE - INTERVAL '35 days', 1200.00, 'completed'),
('o4', 'c7', CURRENT_DATE - INTERVAL '2 days', 145.00, 'completed');

-- 4. ITENS DO PEDIDO
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, total) VALUES
('o1', 'p1', 'Shampoo Pet Brilho Intenso 5L', 2, 189.90, 379.80),
('o2', 'p8', 'Lâmina de Tosa 10 UltraEdge', 2, 250.00, 500.00),
('o3', 'p9', 'Máquina de Tosa Profissional V5', 1, 1200.00, 1200.00),
('o4', 'p6', 'Perfume Pet Summer Breeze 500ml', 1, 145.00, 145.00);

-- 5. CAMPANHAS
INSERT INTO campaigns (id, title, type, description, template, target_status) VALUES
('camp1', 'Reposição de Shampoo', 'replenishment', 'Campanha focada em clientes que compraram shampoo há mais de 20 dias.', 'Olá {nome}, tudo bem? Notamos que já faz {tempo_sem_comprar} dias desde sua última compra de {produto}. Gostaria de garantir a reposição com 10% de desconto?', '{cooling,inactive}'),
('camp2', 'Lançamento Perfumaria', 'launch', 'Apresentação da nova linha de fragrâncias de outono.', 'Oi {nome}! A {company} acaba de receber nossa nova linha de perfumes de Outono. São fragrâncias exclusivas que seus clientes vão amar. Podemos agendar uma demonstração?', '{active,cooling}'),
('camp3', 'Promoção Estética Pet', 'promotion', 'Desconto em equipamentos de tosa para clientes fiéis.', 'Olá {nome}, temos uma oferta especial para a {company}. Máquinas de tosa e lâminas com 20% OFF esta semana. Aproveite!', '{active}'),
('camp4', 'Recuperação de Clientes', 'replenishment', 'Oferta agressiva para clientes inativos há mais de 30 dias.', 'Sentimos sua falta, {nome}! Faz tempo que não nos falamos. Preparamos uma condição imbatível para você voltar a abastecer a {company}. Vamos conversar?', '{inactive}');
